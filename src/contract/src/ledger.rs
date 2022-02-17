// The ledger will record every operation completed in order
// to have the history of transactions verifiable by everyone.

use crate::types::{Ledger, Operation, Record};
use candid::Nat;
use ic_cdk_macros::*;
use ic_kit::{ic, Principal};

pub fn append_record(
    operation: Operation,
    caller: Option<Principal>,
    from: Principal,
    to: Principal,
    amount: Nat,
    fee: Nat,
    fee_to: Principal,
) {
    let records = ic::get_mut::<Ledger>();
    records.push(Record {
        index: Nat::from(records.len()),
        caller,
        operation,
        from,
        to,
        amount,
        fee,
        fee_to,
        timestamp: ic::time(),
    })
}

#[query]
pub fn ledger() -> Ledger {
    return ic::get::<Ledger>().to_vec();
}
