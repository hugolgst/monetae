// ERC-20 standard: https://eips.ethereum.org/EIPS/eip-20

use ic_cdk_macros::*;
use ic_cdk::export::candid::{types::number::Nat};
use ic_kit::{ic, Principal};
use std::collections::HashMap;

type Balances = HashMap<Principal, Nat>;

struct Token {
  name: str,
  symbol: str,
  decimals: u8,
  total_supply: Nat,
}

#[init]
fn init() {
    // Initialize metadata for the ERC20 token
    let token = ic::get_mut::<Token>();
    token.name = "Hugo";
    token.symbol = "HGL";
    token.decimals = 3;
    token.total_supply = Nat::from(5000000);

    let principal_id = Principal::from_text("kp36f-wbon5-rq45k-vo3r3-fjwqq-jxufl-znnnn-5k35g-7xugj-ggthi-mqe").unwrap();
    let balances = ic::get_mut::<Balances>();
    balances.insert(principal_id, token.total_supply);
}

#[query]
fn name() -> str {
    let name = ic::get::<Token>();
    token.name.clone()
}

#[query]
fn symbol() -> str {
    let symbol = ic::get::<Token>();
    token.symbol.clone()
}

#[query]
fn decimals() -> u8 {
    let decimals = ic::get::<Token>();
    token.decimals.clone()
}

#[update(name = "totalSupply")]
#[query]
fn total_supply() -> Nat {
    let token = ic::get::<Token>();
    token.total_supply.clone()
}

#[update(name = "balanceOf")]
#[query]
fn balance_of(id: Principal) -> Nat {
    let balances = ic::get::<Balances>();
    match balances.get(&id) {
        Some(balance) => balance.clone(),
        None => Nat::from(0),
    }
}
