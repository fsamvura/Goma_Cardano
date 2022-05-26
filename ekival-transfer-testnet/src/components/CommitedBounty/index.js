import React, { useEffect, useState } from "react";
import { StaticQuery, graphql, Link } from "gatsby";
import {
    Heading, Text, Box, Flex, Button, useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import { useStoreState } from "easy-peasy";
import useWallet from "../../hooks/useWallet";
import { useTxAddresses } from "../../hooks/useTxAddresses";

import { fromHex, toHex, toStr } from "../../utils/converter";
import { createBountyDatum } from "../../utils/factory";
import { treasuryIssuerAddress, treasuryContractAddress } from "../../cardano/treasury-contract";
import { distributeBounty } from "../../cardano/bounty-contract";


const CommittedBounty = (props) => {

    const connected = useStoreState((state) => state.connection.connected);
    const { wallet } = useWallet(null)
    const [walletUtxos, setWalletUtxos] = useState([])
    const [walletAddress, setWalletAddress] = useState(null)
    const [contributorAddress, setContributorAddress] = useState(null)
    const [successfulTxHash, setSuccessfulTxHash] = useState(null)



    const utxo = props.utxo
    const slug = "Trans_number"
    const lovelace = utxo.value
    //const gimbals = utxo.tokens[0].quantity
    //const accessToken = utxo.tokens[1].asset.assetName
    const bountyTxHash = utxo.transaction.hash
    const bountyTxIx = utxo.index

    // This hook gets the input Addresses from the Transaction whose output was the Bounty UTXO
    // One input address is the Treasury, so we can disregard that.
    // The other input address is the Contributor
    const {
        txAddresses,
        getTxAddresses,
        loading: addressesLoading,
        error,
    } = useTxAddresses();

    // To get it working, just hard code the Contributor Address:

    // For Modal:
    const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onClose: onSuccessClose } = useDisclosure()
    const { isOpen: isErrorOpen, onOpen: onErrorOpen, onClose: onErrorClose } = useDisclosure()

    useEffect(async () => {
        if (connected && wallet) {
            await getTxAddresses({
                variables: {
                    txhash: bountyTxHash
                },
            });
            const myUtxos = await wallet.utxos;
            setWalletUtxos(myUtxos);
            setWalletAddress(wallet.address)
        }
    }, [wallet])

    useEffect(async () => {
        if (txAddresses) {
            const transactionAddresses = txAddresses.transactions[0]?.inputs.map(input => input.address)
            const contributorAddresses = transactionAddresses?.filter(address => address != treasuryContractAddress)
            if (contributorAddresses) {
                setContributorAddress(contributorAddresses[0])
            }
        }
    }, [txAddresses])


    // OK: How do we get the contributor address?
    // We should be able to look up the txhash -- but this is a next step.

    // To get it working, just hard code the Contributor Address:
    //const contributorAddress = "addr_test1qzdgudzgf00ghdd8tw5ylylk4t76hsgm9pvr9ce73etppk0c8aursjfdhu7nr3sxujgczt2ndefwfc80pphdafv7fnrqact99a"

    // const bDatum = createBountyDatum(connected, contributorAddress, lovelace, gimbals, 10000000000)


    const handleDistribute = async () => {
        try {
            console.log("CANCEL A TRANSFER", lovelace)
            const bDatum = createBountyDatum(contributorAddress, contributorAddress, "800000000", "200000000", "1651025390000", "1", "0")
            //const bDatum = createBountyDatum(connected, treasuryIssuerAddress, lovelace, gimbals, 10000000000)
            const bUtxo = {
                "tx_hash": bountyTxHash,
                "output_index": bountyTxIx,
                "amount": [
                    { "unit": "lovelace", "quantity": `${lovelace}` }
                ],
            }
            console.log("bounty UTXO:", bUtxo)

            const bountyDistribution = {
                issuerAddress: connected,
                contributorAddress,
                utxosParam: walletUtxos,
                slug,
                lovelace,

            }

            const txHash = await distributeBounty(bUtxo, bDatum, bountyDistribution)
            console.log("txHash is", txHash)
            if (txHash.error) throw "there was an error"
            else {
                setSuccessfulTxHash(txHash);
                onSuccessOpen();
            }


        } catch (error) {
            onErrorOpen();
        }

    }

    return (
        <Flex direction='column' w='100%' p='3' m='3' bg="red.200" key={slug}>
            <Box>
                <Link to={`/bounties/${slug}`}>
                    <Heading size='md'>
                        Liquidity Provided: {slug}
                    </Heading>
                </Link>
                <Text fontSize='xs' py='1'>
                    {bountyTxHash}#{bountyTxIx}
                </Text>
                <Text fontSize='xs' py='1'>
                    Contributor Address: {contributorAddress}
                </Text>
            </Box>
            <Flex direction='row' justifyContent='center'>
                <Box bg='blue.200' m='3' p='3' fontSize='sm'>
                    Ada: {lovelace / 1000000}
                </Box>


            </Flex>
            <Button m='3' onClick={handleDistribute}>Cancel this Transfer</Button>
            <Modal isOpen={isSuccessOpen} onClose={onSuccessClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Success!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading size='sm'>You Cancelled your Transfer</Heading>
                        <Text>Next step: add successful txHash here: {successfulTxHash}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onSuccessClose}>
                            Great!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isErrorOpen} onClose={onErrorClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Error!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading size='sm'>There was an error with this tx</Heading>
                        <Text>We are working on extending the error reporting for this Dapp (see bounty!). For now, you can check the browser console to idenify the error.</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onErrorClose}>
                            Dang!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}


export default CommittedBounty