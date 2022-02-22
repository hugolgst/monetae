export const idlFactory = ({ IDL }) => {
  const Operation = IDL.Variant({
    'Approval' : IDL.Null,
    'Genesis' : IDL.Null,
    'Transfer' : IDL.Null,
    'TransferFrom' : IDL.Null,
  });
  const Record = IDL.Record({
    'to' : IDL.Principal,
    'from' : IDL.Principal,
    'operation' : Operation,
    'timestamp' : IDL.Nat64,
    'caller' : IDL.Opt(IDL.Principal),
    'index' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  return IDL.Service({
    'allowance' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'approve' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'decimals' : IDL.Func([], [IDL.Nat8], ['query']),
    'fee' : IDL.Func([], [IDL.Nat], ['query']),
    'ledger' : IDL.Func([], [IDL.Vec(Record)], ['query']),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  return [
    IDL.Text,
    IDL.Text,
    IDL.Nat8,
    IDL.Nat,
    IDL.Principal,
    IDL.Nat,
    IDL.Principal,
  ];
};
