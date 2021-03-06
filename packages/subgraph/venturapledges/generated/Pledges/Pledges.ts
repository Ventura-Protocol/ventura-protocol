// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AskSet extends ethereum.Event {
  get params(): AskSet__Params {
    return new AskSet__Params(this);
  }
}

export class AskSet__Params {
  _event: AskSet;

  constructor(event: AskSet) {
    this._event = event;
  }

  get handle(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get cid(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class HandleSet extends ethereum.Event {
  get params(): HandleSet__Params {
    return new HandleSet__Params(this);
  }
}

export class HandleSet__Params {
  _event: HandleSet;

  constructor(event: HandleSet) {
    this._event = event;
  }

  get handle(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class PledgeSet extends ethereum.Event {
  get params(): PledgeSet__Params {
    return new PledgeSet__Params(this);
  }
}

export class PledgeSet__Params {
  _event: PledgeSet;

  constructor(event: PledgeSet) {
    this._event = event;
  }

  get handle(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get ask(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get pledgeAmount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get id(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Pledges__getAskResult {
  value0: Bytes;
  value1: Address;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: Bytes, value1: Address, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromFixedBytes(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class Pledges__getPledgeResult {
  value0: Address;
  value1: BigInt;

  constructor(value0: Address, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class Pledges extends ethereum.SmartContract {
  static bind(address: Address): Pledges {
    return new Pledges("Pledges", address);
  }

  getAsk(_handle: Bytes, _ask: BigInt): Pledges__getAskResult {
    let result = super.call(
      "getAsk",
      "getAsk(bytes32,uint32):(bytes32,address,uint256,uint32)",
      [
        ethereum.Value.fromFixedBytes(_handle),
        ethereum.Value.fromUnsignedBigInt(_ask)
      ]
    );

    return new Pledges__getAskResult(
      result[0].toBytes(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_getAsk(
    _handle: Bytes,
    _ask: BigInt
  ): ethereum.CallResult<Pledges__getAskResult> {
    let result = super.tryCall(
      "getAsk",
      "getAsk(bytes32,uint32):(bytes32,address,uint256,uint32)",
      [
        ethereum.Value.fromFixedBytes(_handle),
        ethereum.Value.fromUnsignedBigInt(_ask)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Pledges__getAskResult(
        value[0].toBytes(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  getPledge(
    _handle: Bytes,
    _ask: BigInt,
    _pledge: BigInt
  ): Pledges__getPledgeResult {
    let result = super.call(
      "getPledge",
      "getPledge(bytes32,uint32,uint32):(address,uint256)",
      [
        ethereum.Value.fromFixedBytes(_handle),
        ethereum.Value.fromUnsignedBigInt(_ask),
        ethereum.Value.fromUnsignedBigInt(_pledge)
      ]
    );

    return new Pledges__getPledgeResult(
      result[0].toAddress(),
      result[1].toBigInt()
    );
  }

  try_getPledge(
    _handle: Bytes,
    _ask: BigInt,
    _pledge: BigInt
  ): ethereum.CallResult<Pledges__getPledgeResult> {
    let result = super.tryCall(
      "getPledge",
      "getPledge(bytes32,uint32,uint32):(address,uint256)",
      [
        ethereum.Value.fromFixedBytes(_handle),
        ethereum.Value.fromUnsignedBigInt(_ask),
        ethereum.Value.fromUnsignedBigInt(_pledge)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Pledges__getPledgeResult(value[0].toAddress(), value[1].toBigInt())
    );
  }

  handles(param0: Bytes): BigInt {
    let result = super.call("handles", "handles(bytes32):(uint32)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);

    return result[0].toBigInt();
  }

  try_handles(param0: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall("handles", "handles(bytes32):(uint32)", [
      ethereum.Value.fromFixedBytes(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class AddAskCall extends ethereum.Call {
  get inputs(): AddAskCall__Inputs {
    return new AddAskCall__Inputs(this);
  }

  get outputs(): AddAskCall__Outputs {
    return new AddAskCall__Outputs(this);
  }
}

export class AddAskCall__Inputs {
  _call: AddAskCall;

  constructor(call: AddAskCall) {
    this._call = call;
  }

  get _handle(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _cid(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get _token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _pledgeAmount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class AddAskCall__Outputs {
  _call: AddAskCall;

  constructor(call: AddAskCall) {
    this._call = call;
  }
}

export class AddPledgeCall extends ethereum.Call {
  get inputs(): AddPledgeCall__Inputs {
    return new AddPledgeCall__Inputs(this);
  }

  get outputs(): AddPledgeCall__Outputs {
    return new AddPledgeCall__Outputs(this);
  }
}

export class AddPledgeCall__Inputs {
  _call: AddPledgeCall;

  constructor(call: AddPledgeCall) {
    this._call = call;
  }

  get _handle(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _ask(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _pledgeAmount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class AddPledgeCall__Outputs {
  _call: AddPledgeCall;

  constructor(call: AddPledgeCall) {
    this._call = call;
  }
}
