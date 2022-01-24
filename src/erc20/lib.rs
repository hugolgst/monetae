// ERC-20 standard: https://eips.ethereum.org/EIPS/eip-20

mod types;

use ic_cdk_macros::*;
use ic_cdk::export::candid::{types::number::Nat};
use ic_kit::{ic, Principal};
use std::string::String;

#[init]
fn init() {
    // Initialize metadata for the ERC20 token
    let token = ic::get_mut::<types::Token>();
    token.name = String::from("Hugo");
    token.symbol = String::from("HGL");
    token.decimals = 3;
    token.total_supply = Nat::from(5000000);

    let principal_id = Principal::from_text("kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe").unwrap();
    let balances = ic::get_mut::<types::Balances>();
    balances.insert(principal_id, token.total_supply.clone());
}

#[query]
fn name() -> String {
    let token = ic::get::<types::Token>();
    token.name.clone()
}

#[query]
fn symbol() -> String {
    let token = ic::get::<types::Token>();
    token.symbol.clone()
}

#[query]
fn decimals() -> u8 {
    let token = ic::get::<types::Token>();
    token.decimals.clone()
}

#[update(name = "totalSupply")]
#[query]
fn total_supply() -> Nat {
    let token = ic::get::<types::Token>();
    token.total_supply.clone()
}

#[update(name = "balanceOf")]
#[query]
fn balance_of(owner: Principal) -> Nat {
    let balances = ic::get::<types::Balances>();
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

    let balances = ic::get_mut::<types::Balances>();
    balances.insert(from, balance_from - value.clone());
    balances.insert(to, balance_of(to) + value.clone());

    true
}

#[update]
fn transfer(to: Principal, value: Nat) -> bool {
    let caller = ic::caller();
    transfer_from(caller, to, value)
}
