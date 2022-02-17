use crate::balance_of;
use crate::ledger::append_record;
use crate::transactions::charge_fee;
use crate::types::{Allowances, Balances, Operation, Token};
use candid::Nat;
use ic_cdk_macros::*;
use ic_kit::{ic, Principal};
use std::collections::HashMap;

// gives the right to the caller to allow the specified principal to spend
// the given value out his account using the transferFrom function
#[update]
pub fn approve(spender: Principal, value: Nat) -> bool {
    let caller = ic::caller();
    let token = ic::get::<Token>();

    // Assert that caller can pay for the given value
    if value.clone() + token.fee.clone() > balance_of(caller) {
        return false;
    }

    // Remove value from caller's balance
    let balances = ic::get_mut::<Balances>();
    let new_balance = balance_of(caller) - value.clone();
    balances.insert(caller, new_balance);

    update_allowance_helper(caller, spender, value.clone());
    charge_fee(caller);

    append_record(
        Operation::Approval,
        None,
        caller,
        spender,
        value,
        token.fee.clone(),
        token.fee_to,
    );

    true
}

// helper to update the value of an allowance
pub fn update_allowance_helper(from: Principal, caller: Principal, new_value: Nat) {
    let allowances = ic::get_mut::<Allowances>();
    let mut allowance: HashMap<Principal, Nat> = match allowances.get(&from) {
        Some(temp_inner) => temp_inner.clone(),
        None => HashMap::new(),
    };

    // Delete record if balance is now 0
    if new_value == 0 {
        allowance.remove(&caller);
    } else {
        allowance.insert(caller, new_value);
    }

    // Delete record if no internal records exists
    if allowance.is_empty() {
        allowances.remove(&from);
    } else {
        allowances.insert(from, allowance);
    }
}

// Get the current allowance value from the specified owner to the spender
#[query]
pub fn allowance(owner: Principal, spender: Principal) -> Nat {
    let allowances = ic::get::<Allowances>();

    match allowances.get(&owner) {
        Some(inner) => match inner.get(&spender) {
            Some(value) => value.clone(),
            None => Nat::from(0),
        },
        None => Nat::from(0),
    }
}
