// ERC-20 standard: https://eips.ethereum.org/EIPS/eip-20
// 
// Principal ID: "kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe"

mod types;
mod ledger;
mod transactions;

use types::{Token, Balances};
use ic_cdk_macros::*;
use candid::{Nat};
use ic_kit::{ic, Principal};
use std::string::String;

#[init]
fn init(token: Token) {
    let balances = ic::get_mut::<Balances>();
    balances.insert(token.owner.clone(), token.total_supply.clone());
}

#[query]
fn name() -> String {
    let token = ic::get::<Token>();
    token.name.clone()
}

#[query]
fn symbol() -> String {
    let token = ic::get::<Token>();
    token.symbol.clone()
}

#[query]
fn decimals() -> u8 {
    let token = ic::get::<Token>();
    token.decimals.clone()
}

#[update(name = "totalSupply")]
#[query]
fn total_supply() -> Nat {
    let token = ic::get::<Token>();
    token.total_supply.clone()
}

#[update(name = "balanceOf")]
#[query]
pub fn balance_of(owner: Principal) -> Nat {
    let balances = ic::get::<Balances>();
    match balances.get(&owner) {
        Some(balance) => balance.clone(),
        None => Nat::from(0),
    }
}
