#!/bin/bash

set -e

if [ "$DEPLOY" = "true" ]; then
	mkdir ~/.config/dfx
	mkdir ~/.config/dfx/identity
	mkdir ~/.config/dfx/identity/default

	echo $INPUT_IDENTITY > ~/.config/dfx/identity/default/identity.pem
	sed -i 's/\\r\\n/\r\n/g' ~/.config/dfx/identity/default/identity.pem
fi

sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
dfx start --background

if [ "$1" = "frontend" -o $# -eq 0 ]; then
  cd "$GITHUB_WORKSPACE/src/frontend" && npm install
  cd "$GITHUB_WORKSPACE"
  dfx canister create frontend
  dfx build frontend

  if [ "$DEPLOY" = "true" ]; then
    dfx deploy --network=ic frontend
  fi
fi

if [ "$1" = "contract" -o $# -eq 0 ]; then
  cargo install ic-cdk-optimizer
  rustup target add wasm32-unknown-unknown
  dfx canister create contract
  dfx build contract

  if [ "$DEPLOY" = "true" ]; then
    dfx deploy contract --argument="(\"Monetae\", \"MAE\", 2:nat8, 1:nat, principal \"kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe\", 500000000:nat, principal \"kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe\")" --network=ic --no-wallet
  fi

  echo "\nModule hash:"
  sha512sum target/wasm32-unknown-unknown/release/contract.wasm | awk '{print $1}'
fi


