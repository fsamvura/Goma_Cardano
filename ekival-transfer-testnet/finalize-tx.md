# Unlocking a Smart Contract with finalizaTx

## Files referenced:
- `/src/cardano/transaction/index.js` for `initializeTx()` and `finalizeTx()`
- `/src/cardano/treasury-contract/index.js` for `commitToBounty()` and instance variables
- `/src/cardano/treasury-contract/datums.js`
- `/src/cardano/treasury-contract/redeemers.js`


## finalizeTx():

```
export const finalizeTx = async ({
  txBuilder,
  changeAddress,
  utxos,
  outputs,
  datums,
  metadata,
  scriptUtxo,
  action,
  plutusScripts,
}) => {
```

### txBuilder

- initialized with `initializeTx()`

### changeAddress

- `wallet.address`

### utxos

- `wallet.utxos`

### outputs

In `/treasury-contract/index.js`, define addresses to match compiled Contracts:

```
export const treasuryIssuerAddress = "addr_test1qq3pzlaap7r2yyawfaxcynxs6w8w520yjaj2ugh4759685cv5qhzt95z9t8lur483fur90ge4ppqk2j89gmu8yy9m0ksac989n"
export const treasuryContractAddress = "addr_test1wrsdlj8k39g4e3rgsza9lstjqctrlml5mghvywf9m4e288gwxshfq"
export const bountyContractAddress = "addr_test1wzd82fzfkrfjqnzpvjyzauve5ssw8wkhgepkd84jggx5n3gful79d"
```

Build outputs to each of these addresses, and add them to transaction in `commitToBounty()`


### datums

- is created
- TODO: show how to pass

### metadata

- TODO: change metadata to object with key and value; create instance variable for key
- pass `slug` from `bountyPage.js` to `commitToBounty()`, and from there to `finalizeTx()`

### scriptUtxo

- TODO

### action

- TODO

### plutusScripts

- import `contractScripts()` from `/treasury-contract/validator.js`
- pass to in `commitToBounty()`, pass `contractScripts` to `finalizeTx()`




#### Earlier notes:

```
<Text>
    Ada in Bounty {slug}: {ada}
</Text>
<Text>
    Gimbals in Bounty {slug}: {gimbals}
</Text>
<Box bg='blue.100' p='2'>
    <Text>
    issuer address: {treasuryIssuerAddress} and pkh: {getAddressKeyHash(treasuryIssuerAddress)}
    </Text>
</Box>
<Box bg='pink.100' p='2'>
    <Text>
    your address: {wallet?.address} and pkh: {getAddressKeyHash(wallet?.address)}
    </Text>
</Box>
<Box bg='yellow.100' p='2'>
    <Text>
    treasury address: {treasuryContractAddress}
    </Text>
</Box>
<Box bg='green.100' p='2'>
    <Text>
    bounty contract address: {bountyContractAddress}
    </Text>
</Box>
<Box bg='purple.100' p='2'>
    <Text>
    We also need the Treasury plutusScript, the Treasury Datum, and the correctly formatted Treasury UTXO. The Treasury Redeemer and Bounty Datum (which are equivalent) will be constructed from the data above.
    </Text>
</Box>
```


#### More early notes:
```

// commitToBounty builds a transaction that draws funds from Treasury and locks a New Bounty UTXO at Bounty Escrow

// To Commit to working on a Bounty, a Contributor initializes a Transaction on the Bounty Tracker front-end
//
//  (AT LEAST) TWO UTXO INPUTS
//
// INPUT 1: Takes an input from the Treasury Contract that contains current treasury funds.
//      To unlock this input, our Tx must include
// a) the Treasury plutus script
// b) a Redeemer that matches BountyDetails as defined in BountyTreasury
// c) a Datum that matches WithdrawalDatum as defined in BountyTreasury
//
//  In order to get the TxHash and TxId for INPUT 1, we'll need to use another tool to query the blockchain.
//
// INPUT(s) 2+: from the Contributor Wallet that includes the AuthToken specified in the Treasury
//  (Note: to cover transaction fee and min-utxos, it may be necessary to include more than one UTXO from Contributor)
//
//  In order to get the TxHash(es) and TxId(s) for INPUT(s) 2+, we can rely on the Contributor's connected wallet.
//
//  THREE UTXO OUTPUTS
//
// OUTPUT 1: an output to the BountyEscrow Contract that contains
// a) Lovelace
// b) some Native Asset (play, gimbal, etc) to match the bounty
// c) The Contributor's AuthToken
// d) REQUIRED DATUM: In this case, the Datum will match the Redeemer created for (2b)
// OUTPUT 2: an output back to the Treasury Contract that contains
// a) all of the Value that is not part of the Bounty
// b) REQUIRED DATUM: In this case, the Datum can once again match WithdrawalDatum as defined in BountyTreasury
//      Note: In the current implementation of the Treasury Contract, this Datum is not yet used in any Validation logic. It can be.
//      (Optional: As an added feature, we can increment bountyCount in this datum)
// OUTPUT 3: send the change (which might include some native assets) back to the Contributor

// How does the Transaction Validate?
// - We must successfully unlock the Treasury Input (INPUT 1), by building a balanced TX that fulfills the requirements of the BountyTreasury Validator
// - Then, the Contributor must sign it


// Current Steps:
// 1. Update treasury-contract/datums.js to work with Treasury Datum -- DRAFTED
// 1. Change serialize Datum functions in treasury-contract datums.js -- DRAFTED
// 2. Update treasury-contract/index.js for same -- WORKING ON THIS (it's the file you're in right now)
// 3. Check imports of "market-contract" or "simple-contract"; use "treasury-contract instead" -- TO DO
// 4. We created treasury-contract/redeemers.js but we don't know yet if it works...
// 5. See finalizeTx below for additional next steps
```