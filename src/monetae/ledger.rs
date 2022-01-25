// The ledger will record every operation completed in order
// to have the history of transactions verifiable by everyone. 

mod types;
use ic_kit::{ic, Principal};
use types::{Ledger, Record};

fn append_record(
    caller: Principal,
    from: Principal,
    to: Principal,
    amount: Nat,
    fee: Nat,
) {
    let ledger = ic::get_mut::<Ledger>;
    ledger.push(Record {
      caller,
      from,
      to,
      amount,
      fee,
      timestamp: ic::time(),
    })
}
