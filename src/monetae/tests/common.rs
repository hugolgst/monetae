use monetae::init;
use candid::{Nat};
use ic_kit::{mock_principals::{alice, john}};

pub fn initialize() {
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
