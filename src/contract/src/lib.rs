// ERC-20 standard: https://eips.ethereum.org/EIPS/eip-20
//
// Principal ID: "kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe"

pub mod allowances;
pub mod ledger;
pub mod transactions;
pub mod types;

use candid::Nat;
use ic_cdk_macros::*;
use ic_kit::{ic, Principal};
use ledger::append_record;
use std::string::String;
use types::{Balances, Operation, Token};

#[init]
pub fn init(
    name: String,
    symbol: String,
    decimals: u8,
    fee: Nat,
    fee_to: Principal,
    total_supply: Nat,
    owner: Principal,
) {
    let token = ic::get_mut::<Token>();
    token.name = name;
    token.symbol = symbol;
    token.decimals = decimals;
    token.fee = fee;
    token.fee_to = fee_to;
    token.total_supply = total_supply;
    token.owner = owner;

    let balances = ic::get_mut::<Balances>();
    let from = Principal::from_text("aaaaa-aa").unwrap();

    // Move all supply to the owner address and append what will be called
    // the genesis record with no fee.
    balances.insert(token.owner, token.total_supply.clone());
    append_record(
        Operation::Genesis,
        None,
        from,
        token.owner,
        token.total_supply.clone(),
        Nat::from(0),
        from,
    );
}

#[query]
pub fn name() -> String {
    let token = ic::get::<Token>();
    token.name.clone()
}

#[query]
pub fn fee() -> Nat {
    let token = ic::get::<Token>();
    token.fee.clone()
}

#[query]
pub fn symbol() -> String {
    let token = ic::get::<Token>();
    token.symbol.clone()
}

#[query]
pub fn decimals() -> u8 {
    let token = ic::get::<Token>();
    token.decimals
}

#[query(name = "totalSupply")]
pub fn total_supply() -> Nat {
    let token = ic::get::<Token>();
    token.total_supply.clone()
}

#[query(name = "balanceOf")]
pub fn balance_of(owner: Principal) -> Nat {
    let balances = ic::get::<Balances>();
    match balances.get(&owner) {
        Some(balance) => balance.clone(),
        None => Nat::from(0),
    }
}
