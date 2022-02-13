mod common;

use monetae::{name, decimals, symbol, total_supply, balance_of};
use monetae::transactions::{transfer};
use monetae::ledger::ledger;
use monetae::types::{Operation};
use candid::{Nat};
use ic_kit::{mock_principals::{alice, bob, john}, MockContext};

#[test]
fn initialization() {
    common::initialize();

    assert_eq!(name(), "Monetae", "name returned the wrong result.");
    assert_eq!(decimals(), 2u8, "decimals returned the wrong result.");
    assert_eq!(symbol(), "MAE", "symbol returned the wrong result.");
    assert_eq!(total_supply(), Nat::from(5000), "total_supply returned the wrong result.");
    assert_eq!(balance_of(alice()), Nat::from(5000), "balance_of returned the wrong result. genesis record may have not happened.");
}

#[test]
fn genesis_record_initialization() {
    common::initialize();

    // Asserting the genesis record is present in the ledger
    match ledger().last().clone() {
        Some(genesis_rec) => {
            assert_eq!(genesis_rec.operation, Operation::Genesis, "first record is not genesis record");
            assert_eq!(genesis_rec.to, alice(), "total supply was not transfered to alice.");
            assert_eq!(genesis_rec.amount, Nat::from(5000), "total supply recorded not correct.");
            assert_eq!(genesis_rec.fee, Nat::from(0), "fees not correct in genesis.");
        }
        None => {
            panic!("genesis record not available.");
        }
    }
}

#[test]
fn caller_transaction() {
    common::initialize();

    let transfer_status = transfer(bob(), Nat::from(10));

    assert_eq!(transfer_status, true, "transfer status not ok.");
    // 5000 (total funds) - 10 (value) - 1 (fee)
    assert_eq!(balance_of(alice()), Nat::from(4989), "funds were not moved away from alice.");
    assert_eq!(balance_of(bob()), Nat::from(10), "funds weren't moved to bob.");
}
