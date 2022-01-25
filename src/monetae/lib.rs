// ERC-20 standard: https://eips.ethereum.org/EIPS/eip-20
// 
// Principal ID: "kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe"

mod types;

use types::{Token, Balances};
use ic_cdk_macros::*;
use ic_cdk::export::candid::{types::number::Nat};
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
fn balance_of(owner: Principal) -> Nat {
    let balances = ic::get::<Balances>();
    match balances.get(&owner) {
        Some(balance) => balance.clone(),
        None => Nat::from(0),
    }
}

#[update(name = "transferFrom")]
#[update]
fn transfer_from(from: Principal, to: Principal, value: Nat) -> bool {
    let balance_from = balance_of(from);
    if balance_from < value || value == 0 {
        return false;
    }

    let balances = ic::get_mut::<Balances>();
    balances.insert(from, balance_from - value.clone());
    balances.insert(to, balance_of(to) + value.clone());

    true
}

#[update]
fn transfer(to: Principal, value: Nat) -> bool {
    let caller = ic::caller();
    transfer_from(caller, to, value)
}
