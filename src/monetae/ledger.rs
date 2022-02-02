// The ledger will record every operation completed in order
// to have the history of transactions verifiable by everyone. 

use ic_kit::{ic, Principal};
use candid::{Nat};
use crate::types::{Ledger, Record, Operation};

pub fn append_record(
    operation: Operation,
    from: Principal,
    to: Principal,
    amount: Nat,
) {
    let records = ic::get_mut::<Ledger>();
    records.push(Record {
      index: records.len(),
      operation,
      from,
      to,
      amount,
      timestamp: ic::time(),
    })
}
