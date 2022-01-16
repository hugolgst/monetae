use ic_cdk_macros::*;
use ic_cdk::export::candid::{types::number::Nat};
use ic_kit::{Principal};
use std::collections::HashMap;

type Balances = HashMap<Principal, Nat>

let max_supply = 5000000

#[init]
fn init() {

}

#[ic_cdk_macros::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}
