use candid::{CandidType, Deserialize, Nat};
use ic_kit::Principal;
use std::collections::HashMap;

pub type Balances = HashMap<Principal, Nat>;
pub type Allowances = HashMap<Principal, HashMap<Principal, Nat>>;

// Metadata for the token, this data should in theory
// be unmutable.
#[derive(Deserialize, CandidType, Clone, Debug)]
pub struct Token {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub fee: Nat,
    pub fee_to: Principal,
    pub total_supply: Nat,
    pub owner: Principal,
}

impl Default for Token {
    fn default() -> Self {
        let principal = Principal::from_text("aaaaa-aa").unwrap();

        Self {
            name: String::from(""),
            symbol: String::from(""),
            decimals: 0u8,
            fee: Nat::from(0),
            fee_to: principal,
            total_supply: Nat::from(0),
            owner: principal,
        }
    }
}

#[derive(CandidType, Clone, Copy, Debug, PartialEq)]
pub enum Operation {
    Genesis,
    Transfer,
    TransferFrom,
    Approval,
}

// Used in the ledger to record every operation
#[derive(CandidType, Clone, Debug)]
pub struct Record {
    pub index: Nat,
    pub caller: Option<Principal>,
    pub operation: Operation,
    pub from: Principal,
    pub to: Principal,
    pub amount: Nat,
    pub fee: Nat,
    pub fee_to: Principal,
    pub timestamp: u64,
}

pub type Ledger = Vec<Record>;
