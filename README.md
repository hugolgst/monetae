# monetæ [![CI](https://github.com/hugolgst/monetae/actions/workflows/ci.yml/badge.svg)](https://github.com/hugolgst/monetae/actions/workflows/ci.yml)

<img src="https://user-images.githubusercontent.com/15371828/154586561-b40df7d7-d2d8-4c38-b673-c850c636a563.svg" align="right" alt="Monetae logo" width="270">

monetæ, pronounced /mɒnətɑ:ə/, which means currency in Latin, is a token implementation compatible with Ethereum's RC20[^1] and based on [Internet Computer](https://dfinity.org/howitworks).
Its purpose is not to create yet another standard trying to attract the interest and adoption of the community, but rather to make a canister available for any future DAO[^2] on the IC[^3].

## Features
monetæ is compliant with ERC20, which means that basic transfers, as well as approvals/allowances, are available. 

Due to IC's reverse gas[^4], the canister needs to be powered with the cycles in advance. That is why the accumulated fees taken from each update operation such as transfer or approve are redistributed to the people powering the canister with cycles.

An ICO module is also available within the monetæ canister, accepting transactions in ICP. The ICO will last until the ICP goal has been reached.

Concerning the governance module, it consists of publishing proposals subject to a certain fee on which people can vote. Proposals must be polar questions, it is considered accepted if more than 50% of the voting weight accepted it.
Each wallet is assigned a voting weight which is a calculus made over your total number of tokens as well as the time you have been holding it.

monetæ also features its own frontend hosted on the IC. It allows users to use the canister's library from the web to exchange tokens or vote on proposals.

In order to follow up on these features please check the roadmap.

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background --clean

dfx canister create --all

dfx deploy frontend
dfx deploy contract --argument="(\"Monetae\", \"MAE\", 2:nat8, 1:nat, principal \"kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe\", 500000000:nat, principal \"kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe\")"
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

[^1]: ERC20 standard, short for Ethereum Request for Comments 20, is the most popular token standard for smart contracts. https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
[^2]: Decentralized Autonomous Organization
[^3]: Internet Computer. https://dfinity.org/howitworks
[^4]: Internet Computer's reverse gas system. https://icp.guide/explaining-the-internet-computer-to-a-5-year-old/#What_is_the_Reverse-Gas_Model
