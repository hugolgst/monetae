#!/bin/bash

set -e

sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

dfx start --background

if [ "$1" = "frontend" -o $# -eq 0 ]; then
  cd "$GITHUB_WORKSPACE/src/frontend" && npm install
  cd "$GITHUB_WORKSPACE"
  dfx canister create frontend
  dfx build frontend
fi

if [ "$1" = "contract" -o $# -eq 0 ]; then
  cargo install ic-cdk-optimizer
  rustup target add wasm32-unknown-unknown
  dfx canister create contract
  dfx build contract

  echo "\nModule hash:"
  sha512sum target/wasm32-unknown-unknown/release/contract.wasm | awk '{print $1}'
fi

