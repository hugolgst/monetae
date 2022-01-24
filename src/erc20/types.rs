use ic_kit::{Principal};
use ic_cdk::export::candid::{types::number::Nat};
use std::collections::HashMap;

pub type Balances = HashMap<Principal, Nat>;

pub struct Token {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub total_supply: Nat,
    pub owner: Principal,
}

impl Default for Token {
    fn default() -> Self {
        Self {
            name: String::from(""),
            symbol: String::from(""),
            decimals: 0u8,
            total_supply: Nat::from(0),
        }
    }
}
