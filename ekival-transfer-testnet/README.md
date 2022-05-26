# Ekival Test Repo
## Ekival | May 2022

## Purpose of the template
This template uses a copy of https://gitlab.com/gimbalabs/jamesdunseith/gimbal-tracker which is a public repo for an escrow contract.

The purpose is to lock, unlock escrow contracts in different settings

Ideally, we can set up a local host testing environment for Ekival. Avoir une version locale me permet de contribuer en identifiant les causes des erreurs.

## How to use:

### 1. Grab this repo
```
git clone git@github.com:Uptodate-Developers/updev_ekivalapp.git
npm install
npm run start
```

You may have to use the '--force' option. Your site is now running at http://localhost:8000!

### 2. Use with Cardano `testnet` or `mainnet`
#### in `/src/components/WalletButton/WalletButton.jsx`, look for
```
if ((await window.cardano.getNetworkId()) === 0) return true;
```
- Testnet -> `0` | Mainnet -> `1`


## This project is built with
1. [Gatsby JS](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
2. Chakra UI
3. Easy Peasy for local state management

See `package.json` for full details.
