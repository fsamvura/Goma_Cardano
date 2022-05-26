# Ekival Test Repo
## Ekival | May 2022

## Usage du modele
Ce modèle utilise une copie de https://gitlab.com/gimbalabs/jamesdunseith/gimbal-tracker qui est un dépôt public pour un contrat d'entiercement.

Le but est de verrouiller, déverrouiller les contrats d'entiercement dans différents contextes

Idéalement, nous pouvons mettre en place un environnement de test hôte local pour Ekival. Avoir une version locale me permet de contribuer en identifiant les causes des erreurs.

## How to use:

### 1. Grab this repo
```
git clone git@github.com:fsamvura/Goma_Cardano.git
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
