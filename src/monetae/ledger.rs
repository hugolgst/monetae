// The ledger will record every operation completed in order
// to have the history of transactions verifiable by everyone. 

use ic_kit::{ic, Principal};
use candid::{Nat};
use crate::types::{Ledger, Record, Operation};
use ic_cdk_macros::*;

pub fn append_record(
    operation: Operation,
    from: Principal,
    to: Principal,
    amount: Nat,
) {
    let records = ic::get_mut::<Ledger>();
    records.push(Record {
      index: Nat::from(records.len()),
      operation,
      from,
      to,
      amount,
      timestamp: ic::time(),
    })
}

#[query]
pub fn transactions() -> Ledger {
  return ic::get::<Ledger>().to_vec();
}
