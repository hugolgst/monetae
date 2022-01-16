use ic_cdk_macros::*;
use ic_cdk::export::candid::{types::number::Nat};
use ic_kit::{ic, Principal};
use std::collections::HashMap;

type Balances = HashMap<Principal, Nat>;

#[init]
fn init() {
    // Initialize metadata for the ERC20 token
    let principal_id = Principal::from_text("kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe").unwrap();
    let total_supply = ic::get_mut::<Nat>();
    *total_supply = Nat::from(5000000);
    let balances = ic::get_mut::<Balances>();

    balances.insert(principal_id, total_supply.clone());
}

#[query]
fn balance_of(id: Principal) -> Nat {
    let balances = ic::get::<Balances>();
    match balances.get(&id) {
        Some(balance) => balance.clone(),
        None => Nat::from(0),
    }
}
