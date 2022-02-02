use ic_kit::{ic, Principal};
use ic_cdk_macros::*;
use candid::{Nat};
use crate::ledger::{append_record};
use crate::types::{Balances, Operation};
use crate::{balance_of};

fn transfer_helper(from: Principal, to: Principal, value: Nat) {
}

#[update(name = "transferFrom")]
#[update]
pub fn transfer_from(from: Principal, to: Principal, value: Nat) -> bool {
    let balance_from = balance_of(from);
    if balance_from < value || value == 0 {
        return false;
    }

    let balances = ic::get_mut::<Balances>();
    balances.insert(from, balance_from - value.clone());
    balances.insert(to, balance_of(to) + value.clone());

    append_record(
        Operation::TransferFrom,
        from,
        to,
        value,
    );

    true
}
