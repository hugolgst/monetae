import type { Principal } from '@dfinity/principal';
export type Operation = { 'Approval' : null } |
  { 'Genesis' : null } |
  { 'Transfer' : null } |
  { 'TransferFrom' : null };
export interface Record {
  'to' : Principal,
  'from' : Principal,
  'operation' : Operation,
  'timestamp' : bigint,
  'caller' : [] | [Principal],
  'index' : bigint,
  'amount' : bigint,
}
export interface _SERVICE {
  'allowance' : (arg_0: Principal, arg_1: Principal) => Promise<bigint>,
  'approve' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'decimals' : () => Promise<number>,
  'ledger' : () => Promise<Array<Record>>,
  'name' : () => Promise<string>,
  'symbol' : () => Promise<string>,
  'totalSupply' : () => Promise<bigint>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'transferFrom' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: bigint,
    ) => Promise<boolean>,
}
