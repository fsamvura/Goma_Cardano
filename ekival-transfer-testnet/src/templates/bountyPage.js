import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby";
import {
    Box, Text, Heading, Button, Center, Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import useWallet from "../hooks/useWallet"
import { useUtxosFromAddress } from "../hooks/useUtxosFromAddress"
import { getAddressKeyHash, createBountyDatum, createTreasuryDatum } from "../utils/factory"
import { fromBech32 } from "../utils/converter";
import { serializeBountyDatum, deserializeBounty } from "../cardano/treasury-contract/datums";
import { treasuryIssuerAddress, treasuryContractAddress, bountyContractAddress, commitToBounty } from "../cardano/treasury-contract";


// Get markdown styles
import * as style from "./bountyDetails.module.css"




const Template = ({ data, pageContext }) => {
    // Get Bounty Data from Markdown FrontMatter
    const { markdownRemark } = data
    const { next, prev } = pageContext
    const title = markdownRemark.frontmatter.title
    const date = markdownRemark.frontmatter.date
    const slug = markdownRemark.frontmatter.slug
    const completed = markdownRemark.frontmatter.completed
    const tags = markdownRemark.frontmatter.tags
    const scope = markdownRemark.frontmatter.scope
    const ada = markdownRemark.frontmatter.ada
    const lovelace = ada * 1000000
    const gimbals = markdownRemark.frontmatter.gimbals
    const html = markdownRemark.html

    console.log("lovelace", lovelace)

    // Get connected wallet from Easy Peasy
    const { wallet } = useWallet(null)
    const connected = useStoreState((state) => state.connection.connected);
    const [walletUtxos, setWalletUtxos] = useState([]);



    // Use this hook to query the Treasury Contract address
    const {
        utxos: treasuryUtxos,
        getUtxos,
        loading: utxosLoading,
        error,
    } = useUtxosFromAddress();

    // Create a modal
    // TODO: report on errors
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Use useUtxosFromAddress hook to grab the UTXO from Treasury Contract
    useEffect(async () => {
        if (connected && wallet) {
            await getUtxos({
                variables: {
                    addr: treasuryContractAddress,
                },
            });
            const myUtxos = await wallet.utxos;
            setWalletUtxos(myUtxos);
        }
    }, [wallet])

    // Extract some Treasury Information from the Treasury UTXO
    const [lovelaceAtTreasury, setLovelaceAtTreasury] = useState("0")
    const [tokensAtTreasury, setTokensAtTreasury] = useState("0")
    const [txHashAtTreasury, setTxHashAtTreasury] = useState(null)
    const [txIxAtTreasury, setTxIxAtTreasury] = useState("0")
    useEffect(async () => {
        setLovelaceAtTreasury(treasuryUtxos?.utxos[0].value)
        setTokensAtTreasury(treasuryUtxos?.utxos[0].tokens[0].quantity)
        setTxHashAtTreasury(treasuryUtxos?.utxos[0].transaction.hash)
        setTxIxAtTreasury(treasuryUtxos?.utxos[0].index)
    }, [treasuryUtxos])


    // LEFT OFF HERE ON 4-15
    // BUILD THIS TX,
    // CHECK TYPES
    // MAKE REDEEMER WORK
    const handleBountyCommitment = async () => {
        try {
            console.log("BUILD A BOUNTY COMMITMENT")
            const bDatum = createBountyDatum(treasuryIssuerAddress, wallet.address, lovelace, gimbals, 10000000000)
            const tDatum = createTreasuryDatum("101", treasuryIssuerAddress)
            console.log("here is your treasury datum", tDatum)
            const tUtxo = {
                "tx_hash": txHashAtTreasury,
                "output_index": txIxAtTreasury,
                "amount": [
                    {"unit": "lovelace", "quantity": `${lovelaceAtTreasury}`},
                    {"unit": "cb4a5cb63378a521cb82bdfacc4a8fd543b22ae19c094b75e13f78537447696d62616c", "quantity": `${tokensAtTreasury}`}
                ],
            }
            const bountyCommitment = {
                contributorAddress: fromBech32(wallet.address),
                utxosParam: walletUtxos,
                bountySlug: slug, // need a hook that keeps current selected?
                bAda: ada, // from frontmatter
                bGimbals: gimbals, // from frontmater
                tUtxo,
                tLovelaceIn: lovelaceAtTreasury,
                tGimbalsIn: tokensAtTreasury
              }
            console.log("ok here is your datum", bDatum)
            // serialize
            const serDatum = serializeBountyDatum(bDatum)
            console.log("Just to show that this works, here is your serialized Datum", serDatum)
            // deserialize
            console.log("And here is your deserialized Datum", deserializeBounty(serDatum))
            console.log("Here is your bountyCommitment:", bountyCommitment)
            commitToBounty(bDatum, tDatum, bountyCommitment)
        } catch (error) {
            console.log("HANDLE BOUNTY ERROR", error)
        }
    }

    return (
        <>
            <Box mx='auto' my='10' p='5' bg="white" w='50%'>
                <Heading>
                    {title}
                </Heading>
                <Box bg="purple.200" p='5'>
                    {connected ? (
                        <>
                            <Text fontSize='xs'>
                                Address: {wallet?.address}
                            </Text>
                            <Text fontSize='xs'>
                                ADA: {wallet?.balance}
                            </Text>
                            <Text fontSize='xs'>
                                UTXOs: {JSON.stringify(wallet?.utxos)}
                            </Text>
                            <Text fontSize='xs'>
                                Assets: {JSON.stringify(wallet?.assets)}
                            </Text>
                            <Heading size='lg'>Bounty Escrow Datum (and, because they have the same structure, Treasury Redeemer) Requires</Heading>
                            <Text>1. issuer address: {treasuryIssuerAddress} and pkh: {getAddressKeyHash(treasuryIssuerAddress)}</Text>
                            <Text>2. contributor PKH (from wallet). yours is: {wallet?.address ? getAddressKeyHash(wallet?.address) : "loading"} </Text>
                            <Text>3. lovelace (from frontmatter) = {ada}</Text>
                            <Text>4. gimbals (from frontmatter) = {gimbals}</Text>
                            <Text>5. expiration (implement later, hard code for now)</Text>
                            <Heading>And we'll add the slug as metadata</Heading>
                            <Text>{slug}</Text>
                            <Button onClick={onOpen}>Commit to Bounty</Button>
                        </>
                    ) : ("please connect a wallet to commit to a bounty")}
                </Box>
                <Box bg="green.200" p='5'>
                    <Heading>Show how datum works</Heading>
                    <Heading size='sm' py='2'>We can build and serialize it:</Heading>
                    <Heading size='sm' py='2'>Then deserialize it</Heading>
                    <Heading size='sm' py='2'>If all that works, we need to see the redeemer</Heading>
                    <Button onClick={handleBountyCommitment}>Build Datum</Button>
                </Box>
                <Box bg="orange.200" p='5'>
                    <Heading>What's in the Treasury?</Heading>
                    <Text>this much lovelace: {lovelaceAtTreasury}</Text>
                    <Text>this much gimbals: {tokensAtTreasury}</Text>
                    <Text>(It's all the Tx: {txHashAtTreasury}#{txIxAtTreasury})</Text>
                    <Text>And i am the issuer: {treasuryIssuerAddress}</Text>
                </Box>
                <Heading size='sm' py='3'>
                    Posted: {date} {completed ? `| Completed: ${completed}` : ""}
                </Heading>
                <Heading size='sm' py='3'>
                    gimbals: {gimbals} | ada: {ada}
                </Heading>
                <Flex direction='row'>
                    {tags?.map((tag) => <Box bg='orange.400' p='2' mx='2' w="15%" textAlign='center' rounded='md'>{tag}</Box>)}
                    <Box bg='purple.700' color='white' fontWeight='bold' p='2' mx='2' w='15%' textAlign='center' rounded='md'>{scope}</Box>
                </Flex>
                <Box bg='orange.100' mt='5' p='5'>
                    <div dangerouslySetInnerHTML={{ __html: html }} className={style.mdStyle} />
                </Box>
                <Center pt='10'>
                    {prev &&
                        <Link to={`/bounties/${prev.frontmatter.slug}`}>
                            <Button mx='3' border='solid' borderColor='gl-blue'>
                                Previous
                            </Button>
                        </Link>
                    }
                    {next &&
                        <Link to={`/bounties/${next.frontmatter.slug}`}>
                            <Button mx='3' border='solid' borderColor='gl-blue'>
                                Next
                            </Button>
                        </Link>
                    }
                    <Link to="/bounties">
                        <Button mx='3' bg='gl-green' border='solid' borderColor='gl-green'>
                            View All
                        </Button>
                    </Link>
                    <Link to="/metadatatx">
                        <Button mx='3' bg='gl-blue' border='solid' borderColor='gl-blue' color='white'>
                            Send Payment
                        </Button>
                    </Link>
                </Center>
                <Box border='1px' mt='5' p='5'>
                    <Heading>How it Works</Heading>
                    <Text py='3'>
                        At Gimbalabs, we are in the process of experimenting with organizational structure, and we are distributing responsibilities. Our intention is to help people find projects, teams, and learning opportunities that inspire them to action.
                    </Text>
                    <Text py='3'>
                        We are not yet delivering on these intentions: it's a work in progress. That's one reason why this site exists. It is a direct experiment in how I can share my responsibilities by using my personal allocation of Gimbals. If you see a "bounty" that you'd like to take on, please send me DM on Discord (@jamesdunseith#3315), and I'll help you get started.
                    </Text>
                    <Text py='3'>
                        The other reason that this site exists is to serve as a starting point. There is a set of functionality that I'd like to add and a series of experiments that I think we can run within the context of this project. One example of better functionality will be to automate the process of committing to a bounty: clearly it's not sustainable for someone to DM me every time they want to take on a task. One example of an experiment will be to test the <a href="https://gitlab.com/gimbalabs/ppbl-course-01/ppbl-course-01/-/tree/master/project-04" className='colorLink'>Escrow contract that we're currently building in Plutus PBL</a>.
                    </Text>
                    <Text py='3'>
                        If this project inspires you to think of additional next steps or your own experiments, then it's a success. And to all Gimbal Token PBL Groups -- I'll happily accept your Gimbals as payment for helping you set up your own instance of this tool!
                    </Text>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Here is what we need to build a bounty transaction:</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text py='2'>
                                Bounty Id: {slug} (to be included as transaction metadata)
                            </Text>

                            <Text py='2'>
                                Must be completed by: date
                            </Text>

                            <Text py='2'>
                                TODO: Show status by checking that Contributor has Access Token
                            </Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='purple' onClick={handleBountyCommitment}>Commit to this Bounty</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    )
}

export const query = graphql`
    query($pathSlug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $pathSlug } }) {
            html
            frontmatter {
                title
                date
                completed
                tags
                scope
                ada
                gimbals
                slug
            }
        }
    }
`



export default Template