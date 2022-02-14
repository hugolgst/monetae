cargo test -- --list | awk '/: test/{print substr($1, 1, length($1)-1)}'
