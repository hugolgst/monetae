use candid::{Nat, Principal};
use ic_kit::{
    mock_principals::{alice, john},
    MockContext,
};
use monetae::init;
use monetae::ledger::ledger;
use monetae::types::Operation;

pub fn initialize() {
    MockContext::new().with_caller(alice()).inject();

    init(
        String::from("Monetae"),
        String::from("MAE"),
        2u8,
        Nat::from(1),
        john(),
        Nat::from(5000),
        alice(),
    );
}

pub fn assert_record(op: Operation, to: Principal, amount: Nat, fee: Nat) {
    // Asserting the genesis record is present in the ledger
    match ledger().last().clone() {
        Some(genesis_rec) => {
            assert_eq!(genesis_rec.operation, op, "record is not of right type.");
            assert_eq!(
                genesis_rec.to, to,
                "funds were not transfered to right principal."
            );
            assert_eq!(
                genesis_rec.amount, amount,
                "funds were not of right amount."
            );
            assert_eq!(genesis_rec.fee, fee, "fees not correct.");
        }
        None => {
            panic!("no record available.");
        }
    }
}
