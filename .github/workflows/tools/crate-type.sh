sed -i "s/crate-type = .*/crate-type = [\"$1\"]/g" src/contract/Cargo.toml
