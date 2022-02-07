# monetæ
monetæ, pronunced /mɒnətɑ:ə/, which means currency in latin, is a token implementation compatible with Ethereum's RC20[^1] and based on [Internet Computer](https://dfinity.org/howitworks).

Its purpose is not to create yet another standard trying to attract the interest and adoption of the community, but rather to make a canister available for any future DAO[^2] on the IC[^3].

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy

dfx canister install monetae --argument="(\"Monetae\", \"MAE\", 2:nat8, 1:nat8, principal \"kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe\", 500000000:nat, principal \"kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe\")"
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

[^1]: ERC20 standard, short for Ethereum Request for Comments 20, is the most popular token standard for smart contracts. https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
[^2]: Decentralized Autonomous Organization
[^3]: Internet Computer. https://dfinity.org/howitworks
