use ic_kit::{Principal};
use candid::{Nat};

fn transfer_helper(from: Principal, to: Principal, value: Nat) {
    let balance_from = balance_of(from);
    if balance_from < value || value == 0 {
        return false;
    }

    let balances = ic::get_mut::<Balances>();
    balances.insert(from, balance_from - value.clone());
    balances.insert(to, balance_of(to) + value.clone());

    true
}

#[update(name = "transferFrom")]
#[update]
fn transfer_from(from: Principal, to: Principal, value: Nat) -> bool {
}
