use ic_kit::{ic, Principal};
use ic_cdk_macros::*;
use candid::{Nat};
use crate::ledger::{append_record};
use crate::types::{Token, Balances, Operation};
use crate::{balance_of};

fn transfer_helper(op: Operation, from: Principal, to: Principal, value: Nat) {
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

    append_record(
        op,
        from,
        to,
        value,
    );
}

#[update(name = "transferFrom")]
#[update]
pub fn transfer_from(from: Principal, to: Principal, value: Nat) -> bool {
    let token = ic::get::<Token>();
    let balance_from = balance_of(from) - value.clone() - token.fee.clone();

    if balance_from == 0 {
        return false;
    }

    transfer_helper(Operation::TransferFrom, from, to, value.clone());
    transfer_helper(
        Operation::ChargingFee, 
        from, 
        token.fee_to.clone(), 
        Nat::from(token.fee.clone()),
    );

    true
}
