import React, { useState, useEffect } from "react"
import {
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react"
import { useFormik } from "formik"

export const TxForm = ({ edges, onSubmitCb }) => {
  /* initialize formik state */
  const formik = useFormik({
    initialValues: {
      receivingAddress: "",
      metadataMessage: "",
    },
  })

  const [recAddr, setRecAddr] = useState(formik.receivingAddress)
  const [metadataMsg, setMetadataMsg] = useState(formik.metadataMessage)
  const [gimbalsToSend, setGimbalsToSend] = useState(
    formik.numGimbalTokensToSend
  )
  const formValue = { recAddr, metadataMsg, gimbalsToSend }

  useEffect(() => {
    const a = formik.values.receivingAddress
    setRecAddr(a)
  }, [formik.values.receivingAddress])

  useEffect(() => {
    const a = formik.values.metadataMessage
    const bountyId = a.substring(0, 10)
    setMetadataMsg(bountyId)
  }, [formik.values.metadataMessage])

  useEffect(() => {
    const a = formik.values.numGimbalTokensToSend
    setGimbalsToSend(a)
  }, [formik.values.numGimbalTokensToSend])

  return (
    <Box w="50%" p="5" mx="auto" bg="gl-blue" color="white">
      <FormControl>
        <FormLabel fontWeight="bold">
          Enter Receive Address (next step: should autopopulate if address is
          assigned to bounty)
        </FormLabel>
        <Input
          name="receivingAddress"
          onChange={formik.handleChange}
          value={formik.values.receivingAddress}
        />
        <FormLabel pt="5" fontWeight="bold">
          Attach to Bounty: (next step: completed bounties should not show in
          this menu)
        </FormLabel>
        <Select
          name="metadataMessage"
          onChange={formik.handleChange}
          value={formik.values.metadataMessage}
          color="black"
          placeholder="Select Bounty"
        >
          {edges.map((edge) => {
            const { frontmatter } = edge.node
            return (
              <option>
                {frontmatter.slug}: {frontmatter.title}
              </option>
            )
          })}
        </Select>
        <FormLabel pt="5" fontWeight="bold">
          Number of Gimbals to Send (next step: handle decimals)
        </FormLabel>
        <Input
          name="numGimbalTokensToSend"
          onChange={formik.handleChange}
          value={formik.values.numGimbalTokensToSend}
        />
      </FormControl>
      <Box mt="5">
        <Text p="1" fontSize="sm">
          Send Gimbals to: {recAddr}
        </Text>
        <Text p="1" fontSize="sm">
          Gimbal Distribution Memo: {metadataMsg}
        </Text>
        <Text p="1" fontSize="sm">
          Number of Gimbal Tokens: {gimbalsToSend}
        </Text>
        <Button m="3" color="gl-blue" onClick={() => onSubmitCb(formValue)}>
          Send TX
        </Button>
      </Box>
    </Box>
  )
}
