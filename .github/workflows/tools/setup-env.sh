#!/bin/bash

sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"

if [ "$1" == "frontend" -o $# -eq 0 ]; then
  cd "$GITHUB_WORKSPACE/src/frontend" && npm install
fi

if [ "$1" == "contract" -o $# -eq 0 ]; then
  cargo install ic-cdk-optimizer
  rustup target add wasm32-unknown-unknown
fi

dfx start --background
