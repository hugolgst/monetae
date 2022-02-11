use monetae::{init};
use monetae::transactions::{transfer};
use candid::{Nat};
use ic_kit::{mock_principals::{alice, bob, john}}

fn initialize() {
    init(
        String::from("Monetae"),
        String::from("MAE"),
        2u8,
        Nat::from(1),
        john,
        Nat::from(50000000000),
        john,
    );
}

#[test]
fn caller_transaction() {

}
