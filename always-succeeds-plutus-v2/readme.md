# Always Succeeds PlutusV2
- Minimal implementation of a Plutus project, built using [Plutus Apps](https://github.com/input-output-hk/plutus-apps) tag `v1.0.0-alpha1`.
- Use this as a template for `PlutusV2` contracts.

## Guiding Question: How are PlutusV2 transactions different from PlutusV1 transactions?

## Transaction Templates:
- For now, see [`readme-preview.md`](https://gitlab.com/gimbalabs/plutus-pbl-summer-2022/projects/always-succeeds-plutus-v2/-/blob/master/readme-preview.md) for transaction examples.

## Review - Getting Started:
- Adapted from [PPBL Course 02 - Project 01](https://gitlab.com/gimbalabs/plutus-pbl-summer-2022/ppbl-course-02/-/tree/master/project-01)
- This project uses a different tag of Plutus-Apps, and included revised `cabal.project` and `always-succeeds-plutus-v2.cabal` files.

### Start by cloning this repository and Plutus-Apps
```
git clone https://gitlab.com/gimbalabs/plutus-pbl-summer-2022/projects/always-succeeds-plutus-v2
git clone https://github.com/input-output-hk/plutus-apps
```
Then create an `/output` folder at the root of the project, because our Plutus compiler will expect this directory to exist.
- `cd always-succeeds-plutus-v2`
- `mkdir output`

## Step 2: Start Plutus-Apps
- In `cabal.project`, look for the expected tag for `plutus-apps`
- Change directory to `/plutus-apps` that was cloned earlier (hint: for this project, it's `v1.0.0-alpha1`)
- In `/plutus-apps`, run `git checkout v1.0.0-alpha1`.
- in `/plutus-apps` run `nix-shell`

#### You will know you are successful if:
- You can see the nix command line `[nix-shell:~/.../plutus-apps]$`

## Step 3: Compile your first Plutus Script
- In `nix-shell`, change directory to `/cd always-succeeds-plutus-v2`
- Run `cabal update` (this may take a while the first time)
- Run `cabal repl` (this may take a while the first time)

#### You will know you are successful if:
You can run `cabal repl` and see that AlwaysSucceedsCompiler is loaded:
```
Prelude AlwaysSucceedsCompiler>
```
...and you can run `writeAlwaysSucceedsScript` and get
```
Right ()
```
Now look in `/always-succeeds-plutus-v2/output`. You should see your compiled Plutus Script - way to go!


## Build the Address:
If you have `cardano-cli` installed, you can create a Contract Address from this script.

```
cardano-cli address build \
--payment-script-file /always-succeeds-plutus-v2/output/always-succeeds-plutus-v2.plutus
--testnet-magic 2 \
--out-file always-succeeds-plutus-v2.addr
```
