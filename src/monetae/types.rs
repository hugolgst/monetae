use ic_kit::{Principal};
use candid::{Nat, Deserialize, CandidType};
use std::collections::HashMap;

pub type Balances = HashMap<Principal, Nat>;

// Metadata for the token, this data should in theory
// be unmutable.
#[derive(Deserialize, CandidType, Clone, Debug)]
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
            owner: Principal::from_text("aaaaa-aa").unwrap(),
        }
    }
}

// Used in the ledger to record every operation
pub struct Record {
    pub caller: Principal,
    // pub operation: Operation
    pub from: Principal,
    pub to: Principal,
    pub amount: Nat,
    pub fee: Nat,
    pub timestamp: u64,
}
