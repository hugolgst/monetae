use ic_kit::{ic, Principal};
use ic_cdk_macros::*;
use candid::{Nat};
use crate::types::{Token, Allowances};
use crate::{balance_of};
use std::collections::HashMap;

// gives the right to the caller to allow the specified principal to spend
// the given value out his account using the transferFrom function
#[update]
fn approve(spender: Principal, value: Nat) -> bool {
    let caller = ic::caller();
    let allowances = ic::get_mut::<Allowances>();
    let token = ic::get::<Token>();

    if value.clone() + token.fee.clone() > balance_of(caller) {
        return false;
    }

    let mut inner: HashMap<Principal, Nat>;
    match allowances.get(&caller) {
        Some(temp_inner) => {
            inner = temp_inner.clone();
        }
        None => {
            inner = HashMap::new();
        }
    }

    inner.insert(spender, value.clone());
    allowances.insert(caller, inner);

    true
}

// Get the current allowance value from the specified owner to the spender
#[query]
fn allowance(owner: Principal, spender: Principal) -> Nat {
    let allowances = ic::get::<Allowances>();

    match allowances.get(&owner) {
        Some(inner) => match inner.get(&spender) {
            Some(value) => value.clone(),
            None => Nat::from(0),
        },
        None => Nat::from(0),
    }
}