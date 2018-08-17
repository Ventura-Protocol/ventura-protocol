// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Ask extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Ask entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Ask entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Ask", id.toString(), this);
  }

  static load(id: string): Ask | null {
    return store.get("Ask", id) as Ask | null;
  }

  get handle(): Bytes {
    let value = this.get("handle");
    return value.toBytes();
  }

  set handle(value: Bytes) {
    this.set("handle", Value.fromBytes(value));
  }

  get cid(): Bytes {
    let value = this.get("cid");
    return value.toBytes();
  }

  set cid(value: Bytes) {
    this.set("cid", Value.fromBytes(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    return value.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get index(): BigInt {
    let value = this.get("index");
    return value.toBigInt();
  }

  set index(value: BigInt) {
    this.set("index", Value.fromBigInt(value));
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }
}