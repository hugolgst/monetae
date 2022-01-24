# monetæ
monetæ, pronunced /mɒnətɑ:ə/ which means currency in latin, is a token standard compatible with [Ethereum's RC20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) and based on [Internet Computer](https://dfinity.org/howitworks).

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.
