mod common;

use monetae::{name, decimals, symbol, total_supply, balance_of};
use monetae::transactions::{transfer};
use monetae::types::{Operation};
use common::{initialize, assert_record};
use candid::{Nat};
use ic_kit::{mock_principals::{alice, bob}};

#[test]
fn lib_initialization() {
    initialize();

    assert_eq!(name(), "Monetae", "name returned the wrong result.");
    assert_eq!(decimals(), 2u8, "decimals returned the wrong result.");
    assert_eq!(symbol(), "MAE", "symbol returned the wrong result.");
    assert_eq!(total_supply(), Nat::from(5000), "total_supply returned the wrong result.");
    assert_eq!(balance_of(alice()), Nat::from(5000), "balance_of returned the wrong result. genesis record may have not happened.");
}

#[test]
fn lib_genesis_rec_initialization() {
    initialize();

    assert_record(
        Operation::Genesis,
        alice(),
        Nat::from(5000),
        Nat::from(0),
    )
}

#[test]
fn lib_caller_transaction() {
    initialize();

    let transfer_status = transfer(bob(), Nat::from(10));

    assert_eq!(transfer_status, true, "transfer status not ok.");
    // 5000 (total funds) - 10 (value) - 1 (fee)
    assert_eq!(balance_of(alice()), Nat::from(4989), "funds were not moved away from alice.");
    assert_eq!(balance_of(bob()), Nat::from(10), "funds weren't moved to bob.");

    assert_record(Operation::Transfer, bob(), Nat::from(10), Nat::from(1));
}