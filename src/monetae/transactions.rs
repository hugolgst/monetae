use ic_kit::{ic, Principal};
use ic_cdk_macros::*;
use candid::{Nat};
use crate::ledger::{append_record};
use crate::types::{Token, Balances, Operation};
use crate::allowances::{allowance, update_allowance_helper};
use crate::{balance_of};

// helper function to process the movement of tokens in the balances.
fn transfer_helper(from: Principal, to: Principal, value: Nat) {
    let balance_from = balance_of(from);
    let new_balance = balance_from.clone() - value.clone();

    // Value cannot be lower or equal to the fee
    if new_balance == 0 {
        return
    }

    // Modifies the balances of the Principals
    let balances = ic::get_mut::<Balances>();
    balances.insert(from, new_balance);
    balances.insert(to, balance_of(to) + value.clone());
}

fn charge_fee(from: Principal) {
    let token = ic::get::<Token>();
    transfer_helper(from, token.fee_to.clone(), token.fee.clone());
}

#[update]
pub fn transfer(to: Principal, value: Nat) -> bool {
    let from = ic::caller();
    let token = ic::get::<Token>();
    let balance_from = balance_of(from) - value.clone() - token.fee.clone();

    if balance_from == 0 {
        return false;
    }

    transfer_helper(from, to, value.clone());
    charge_fee(from);

    let token = ic::get::<Token>();
    append_record(
        Operation::Transfer,
        from,
        to,
        value,
        token.fee.clone(),
        token.fee_to.clone(),
    );

    true
}

#[update]
pub fn transfer_from(from: Principal, to: Principal, value: Nat) -> bool {
    let token = ic::get::<Token>();
    let caller = ic::caller();
    let allowance_new = allowance(from, caller) - value.clone() - token.fee.clone();

    if allowance_new < Nat::from(0) {
        return false;
    }

    update_allowance_helper(from, caller, allowance_new);
    transfer_helper(from, to, value.clone());
    charge_fee(from);

    true
}
