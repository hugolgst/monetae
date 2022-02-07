use ic_kit::{ic, Principal};
use ic_cdk_macros::*;
use candid::{Nat};
use crate::types::{Token, Allowances};
use crate::{balance_of};
use std::collections::HashMap;

#[update]
pub fn approve(spender: Principal, value: Nat) -> bool {
    let caller = ic::caller();
    let allowances = ic::get_mut::<Allowances>();
    let token = ic::get::<Token>();

    if value.clone() + token.fee.clone() > balance_of(caller) {
        return false;
    }

    let mut inner: HashMap<Principal, Nat>;
    match allowances.get(&caller) {
        Some(temp_inner) => {
            inner = temp_inner.clone();
        }
        None => {
            inner = HashMap::new();
        }
    }

    inner.insert(spender, value.clone());
    allowances.insert(caller, inner);

    true
}
