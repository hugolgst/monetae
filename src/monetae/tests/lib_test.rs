mod common;

use candid::Nat;
use common::{assert_fee_received, assert_record, initialize};
use ic_kit::mock_principals::{alice, bob, john};
use monetae::allowances::{allowance, approve};
use monetae::transactions::{transfer, transfer_from};
use monetae::types::Operation;
use monetae::{balance_of, decimals, name, symbol, total_supply};

#[test]
fn initialization() {
    initialize();

    assert_eq!(name(), "Monetae", "name returned the wrong result.");
    assert_eq!(decimals(), 2u8, "decimals returned the wrong result.");
    assert_eq!(symbol(), "MAE", "symbol returned the wrong result.");
    assert_eq!(
        total_supply(),
        Nat::from(5000),
        "total_supply returned the wrong result."
    );
    assert_eq!(
        balance_of(alice()),
        Nat::from(5000),
        "balance_of returned the wrong result. genesis record may have not happened."
    );
}

#[test]
fn genesis_rec_initialization() {
    initialize();

    assert_record(Operation::Genesis, alice(), Nat::from(5000), Nat::from(0))
}

#[test]
fn caller_transaction() {
    initialize();

    let transfer_status = transfer(bob(), Nat::from(10));

    assert_eq!(transfer_status, true, "transfer status not ok.");
    // 5000 (total funds) - 10 (value) - 1 (fee)
    assert_eq!(
        balance_of(alice()),
        Nat::from(4989),
        "funds were not moved away from alice."
    );
    assert_eq!(
        balance_of(bob()),
        Nat::from(10),
        "funds weren't moved to bob."
    );
    assert_fee_received();

    assert_record(Operation::Transfer, bob(), Nat::from(10), Nat::from(1));
}

#[test]
fn approval() {
    let ctx = initialize();

    let approval_status = approve(bob(), Nat::from(10));

    assert_eq!(approval_status, true, "approval status not ok.");
    assert_eq!(
        balance_of(alice()),
        Nat::from(4989),
        "alice funds were not moved."
    );
    assert_eq!(
        allowance(alice(), bob()),
        Nat::from(10),
        "allowance value not right."
    );
    assert_record(Operation::Approval, bob(), Nat::from(10), Nat::from(1));
    assert_fee_received();

    ctx.update_caller(bob());
    let transfer_status = transfer_from(alice(), john(), Nat::from(5));

    assert_eq!(transfer_status, true, "transfer_from status not ok.");
    assert_eq!(
        balance_of(john()),
        Nat::from(5),
        "funds from approval were not moved."
    );
    assert_eq!(
        allowance(alice(), bob()),
        Nat::from(4),
        "allowance funds were not updated correctly."
    );
}
