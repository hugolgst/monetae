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

    if balance_from.clone() < value.clone() {
        return
    }

    // Modifies the balances of the Principals
    let balances = ic::get_mut::<Balances>();
    balances.insert(from, balance_from.clone() - value.clone());
    balances.insert(to, balance_of(to) + value.clone());
}

// helper to charge the default fee given in the init metadata to the
// specified principal
pub fn charge_fee(from: Principal) {
    let token = ic::get::<Token>();
    transfer_helper(from, token.fee_to.clone(), token.fee.clone());
}

#[update]
pub fn transfer(to: Principal, value: Nat) -> bool {
    let from = ic::caller();
    let token = ic::get::<Token>();

    // Make sure the sender has enough tokens in his account to finance
    // the given value plus the fee
    if balance_of(from) < value.clone() + token.fee.clone() {
        return false;
    }

    transfer_helper(from, to, value.clone());
    charge_fee(from);

    let token = ic::get::<Token>();
    append_record(
        Operation::Transfer,
        None,
        from,
        to,
        value,
        token.fee.clone(),
        token.fee_to.clone(),
    );

    true
}

#[update(name = "transferFrom")]
#[update]
pub fn transfer_from(from: Principal, to: Principal, value: Nat) -> bool {
    let token = ic::get::<Token>();
    let caller = ic::caller();
    let allowance_new = allowance(from, caller) - value.clone() - token.fee.clone();

    if allowance_new < Nat::from(0) {
        return false;
    }

    update_allowance_helper(from, caller, allowance_new);
    let balances = ic::get_mut::<Balances>();
    balances.insert(to, value.clone());

    append_record(
        Operation::TransferFrom,
        Some(caller),
        from,
        to,
        value,
        token.fee.clone(),
        token.fee_to.clone(),
        );

    true
}
