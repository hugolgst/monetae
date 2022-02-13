use monetae::init;
use candid::{Nat};
use ic_kit::{mock_principals::{alice, john}, MockContext};

pub fn initialize() {
    MockContext::new()
        .with_caller(alice())
        .inject();

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
