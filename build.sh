#!/bin/bash

cargo build --target wasm32-unknown-unknown --package contract --release
ic-cdk-optimizer target/wasm32-unknown-unknown/release/contract.wasm -o target/wasm32-unknown-unknown/release/contract_opt.wasm
