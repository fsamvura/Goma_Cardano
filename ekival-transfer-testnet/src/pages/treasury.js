import React, { useEffect, useState } from "react"
import { useStoreState } from "easy-peasy"
import {
    Flex, Heading, Text, Box, Button,
    Input, FormControl, FormLabel, FormErrorMessage, FormHelperText,
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
} from "@chakra-ui/react"
import { Formik, useFormik } from 'formik'
import { useUtxosFromAddress } from "../hooks/useUtxosFromAddress"
import useWallet from "../hooks/useWallet"
import { treasuryContractAddress, treasuryIssuerAddress } from "../cardano/treasury-contract"
import CommittedBounty from "../components/CommitedBounty"
import { lockingTx } from "../cardano/locking-tx"

const Treasury = () => {

    // Get connected wallet from Easy Peasy
    const { wallet } = useWallet(null)
    const connected = useStoreState((state) => state.connection.connected);
    const [walletUtxos, setWalletUtxos] = useState([]);

    // Hard code for now. Build a form later:
    const formik = useFormik({
        initialValues: {
            setRedeemerToLock: 0,
            lovelaceToLock: 0,
            cityToSend: 0,

        },
    })
    const [receiverToSend, setRedeemerToLock] = useState(formik.receiverToSend)
    const [lovelaceToLock, setLovelaceToLock] = useState(formik.lovelaceToLock)
    const [cityToSend, setDatumToLock] = useState(formik.cityToSend)

    useEffect(() => {
        const n = formik.values.receiverToSend;
        setRedeemerToLock(n);
    }, [formik.values.receiverToSend])

    useEffect(() => {
        const n = formik.values.lovelaceToLock;
        setLovelaceToLock(n);
    }, [formik.values.lovelaceToLock])

    useEffect(() => {
        const n = formik.values.cityToSend;
        setDatumToLock(n);
    }, [formik.values.cityToSend])

    //const lovelaceToLock = document.getElementById("amtcode").value;
    const adaEquiv = lovelaceToLock / 1000000;


    // Use this hook to query the Bounty Contract address
    const {
        utxos: treasuryUtxos,
        getUtxos,
        loading: utxosLoading,
        error,
    } = useUtxosFromAddress();

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

    const handleLockFundsInTreasury = async () => {
        try {
            const treasuryLockParams = {
                address: connected,
                utxosParam: walletUtxos,
                lovelace: lovelaceToLock

            }
            lockingTx(treasuryLockParams)
        } catch (error) {
            console.log("Error locking Treasury Funds", error)
        }
    }

    return (
        <>
            <title>SEND</title>
            <Flex
                w="100%"
                mx="auto"
                direction="column"
                wrap="wrap"
                bg="gl-yellow"
                p="10"
            >
                <Box w="50%" mx="auto" my="5">
                    <Heading py='5'>Provider can Lock Funds in Ekival</Heading>
                    {connected ? (
                        <Box bg='blue.200' m='5' p='5'>
                            <Heading>Fund the Ekival Contract</Heading>
                            <Text py='5'>
                                You are the Issuer specified for this Transfer, so you can lock funds in the Ekival Escrow Contract.
                            </Text>
                            {/* <Heading size='lg'>What is in the Ekival account now?</Heading>
                            <Text>{JSON.stringify(treasuryUtxos)}</Text> */}
                            <label>How much do you want to lock?:</label><br></br>
                            <FormControl>
                                <FormLabel>Address of Distributor:</FormLabel>
                                <Input name="receiverToSend" onChange={formik.handleChange} value={formik.values.receiverToSend} />
                                <FormHelperText>This is the contact handing out the value: yourself or someone else</FormHelperText>
                                <FormLabel>City where funds are located:</FormLabel>
                                <Input name="cityToSend" onChange={formik.handleChange} value={formik.values.cityToSend} />
                                <FormHelperText>if mobile money is select and available, select the whole country</FormHelperText>
                                <FormLabel># Lovelace to Lock:</FormLabel>
                                <Input name="lovelaceToLock" onChange={formik.handleChange} value={formik.values.lovelaceToLock} />
                                <FormHelperText>in lovelace</FormHelperText>

                            </FormControl>
                            <Text p='1'>
                                By pressing "Send Funds", you will lock:
                            </Text>
                            <Text p='1'>
                                <p id="output"></p>
                                {lovelaceToLock} lovelace which is equal to {adaEquiv} Ada.
                                A minimum of 1 Ada is required for any transaction on Cardano.
                            </Text>

                            <Text p='1'>
                                Number UTXOs in connected wallet: {walletUtxos.length}
                            </Text>
                            <Button m='5' onClick={handleLockFundsInTreasury}>Send Funds to Ekival</Button>
                        </Box>

                    ) : (
                        <Box bg='blackAlpha.900' m='5' p='5' color='white'>Connect an Ekival Wallet to make transactions.</Box>
                    )}
                </Box>
            </Flex>
        </>
    )
}


export default Treasury
