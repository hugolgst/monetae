mod common;

use monetae::{name, decimals, symbol, total_supply, balance_of};
use candid::{Nat};
use ic_kit::{mock_principals::{alice/*, bob, john*/}, MockContext};

#[test]
fn initialization() {
    MockContext::new()
        .with_caller(alice())
        .inject();
    common::initialize();

    assert_eq!(name(), "Monetae", "name returned the wrong result.");
    assert_eq!(decimals(), 2u8, "decimals returned the wrong result.");
    assert_eq!(symbol(), "MAE", "symbol returned the wrong result.");
    assert_eq!(total_supply(), Nat::from(5000), "total_supply returned the wrong result.");
    assert_eq!(balance_of(alice()), Nat::from(5000), "balance_of returned the wrong result. genesis record may have not happened.");
}
