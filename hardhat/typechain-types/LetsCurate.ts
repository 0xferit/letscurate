/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface LetsCurateInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "JURY_SIZE"
      | "STAKE_SIZE"
      | "announceJuryParticipation"
      | "becomeJuryCandidate"
      | "castVote"
      | "conductJuryDraw"
      | "createCurationPolicy"
      | "createNewItem"
      | "curationPolicyCounter"
      | "isJuryCandidate"
      | "itemCIDs_itemStructs"
      | "resignJuryCandidate"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "NewCurationPolicy"
      | "NewItem"
      | "NewJuryCandidate"
      | "NewJuryDraw"
      | "NewJuryMember"
      | "ResignJuryCandidate"
      | "StateChange"
  ): EventFragment;

  encodeFunctionData(functionFragment: "JURY_SIZE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "STAKE_SIZE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "announceJuryParticipation",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "becomeJuryCandidate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "castVote",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "conductJuryDraw",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "createCurationPolicy",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "createNewItem",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "curationPolicyCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isJuryCandidate",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "itemCIDs_itemStructs",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "resignJuryCandidate",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "JURY_SIZE", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "STAKE_SIZE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "announceJuryParticipation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "becomeJuryCandidate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "castVote", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "conductJuryDraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCurationPolicy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createNewItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "curationPolicyCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isJuryCandidate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "itemCIDs_itemStructs",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "resignJuryCandidate",
    data: BytesLike
  ): Result;
}

export namespace NewCurationPolicyEvent {
  export type InputTuple = [curationPolicyCode: BigNumberish, policy: string];
  export type OutputTuple = [curationPolicyCode: bigint, policy: string];
  export interface OutputObject {
    curationPolicyCode: bigint;
    policy: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewItemEvent {
  export type InputTuple = [itemCID: string, curationPolicyCode: BigNumberish];
  export type OutputTuple = [itemCID: string, curationPolicyCode: bigint];
  export interface OutputObject {
    itemCID: string;
    curationPolicyCode: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewJuryCandidateEvent {
  export type InputTuple = [juryCandidate: AddressLike];
  export type OutputTuple = [juryCandidate: string];
  export interface OutputObject {
    juryCandidate: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewJuryDrawEvent {
  export type InputTuple = [itemCID: string, luckyNumber: BigNumberish];
  export type OutputTuple = [itemCID: string, luckyNumber: bigint];
  export interface OutputObject {
    itemCID: string;
    luckyNumber: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace NewJuryMemberEvent {
  export type InputTuple = [itemCID: string, juryMember: AddressLike];
  export type OutputTuple = [itemCID: string, juryMember: string];
  export interface OutputObject {
    itemCID: string;
    juryMember: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ResignJuryCandidateEvent {
  export type InputTuple = [juryCandidate: AddressLike];
  export type OutputTuple = [juryCandidate: string];
  export interface OutputObject {
    juryCandidate: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace StateChangeEvent {
  export type InputTuple = [itemCID: string, newState: BigNumberish];
  export type OutputTuple = [itemCID: string, newState: bigint];
  export interface OutputObject {
    itemCID: string;
    newState: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface LetsCurate extends BaseContract {
  connect(runner?: ContractRunner | null): LetsCurate;
  waitForDeployment(): Promise<this>;

  interface: LetsCurateInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  JURY_SIZE: TypedContractMethod<[], [bigint], "view">;

  STAKE_SIZE: TypedContractMethod<[], [bigint], "view">;

  announceJuryParticipation: TypedContractMethod<
    [itemCID: string],
    [void],
    "nonpayable"
  >;

  becomeJuryCandidate: TypedContractMethod<[], [void], "nonpayable">;

  castVote: TypedContractMethod<
    [itemCID: string, position: BigNumberish, vote: BigNumberish],
    [void],
    "nonpayable"
  >;

  conductJuryDraw: TypedContractMethod<[itemCID: string], [void], "nonpayable">;

  createCurationPolicy: TypedContractMethod<
    [curationPolicyCID: string],
    [void],
    "nonpayable"
  >;

  createNewItem: TypedContractMethod<
    [itemCID: string, curationPolicyCode: BigNumberish],
    [void],
    "nonpayable"
  >;

  curationPolicyCounter: TypedContractMethod<[], [bigint], "view">;

  isJuryCandidate: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  itemCIDs_itemStructs: TypedContractMethod<
    [arg0: string],
    [
      [bigint, bigint, bigint, bigint] & {
        state: bigint;
        lastStateChangeBlockNumber: bigint;
        lastLuckyNumber: bigint;
        curationScore: bigint;
      }
    ],
    "view"
  >;

  resignJuryCandidate: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "JURY_SIZE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "STAKE_SIZE"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "announceJuryParticipation"
  ): TypedContractMethod<[itemCID: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "becomeJuryCandidate"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "castVote"
  ): TypedContractMethod<
    [itemCID: string, position: BigNumberish, vote: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "conductJuryDraw"
  ): TypedContractMethod<[itemCID: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createCurationPolicy"
  ): TypedContractMethod<[curationPolicyCID: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "createNewItem"
  ): TypedContractMethod<
    [itemCID: string, curationPolicyCode: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "curationPolicyCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "isJuryCandidate"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "itemCIDs_itemStructs"
  ): TypedContractMethod<
    [arg0: string],
    [
      [bigint, bigint, bigint, bigint] & {
        state: bigint;
        lastStateChangeBlockNumber: bigint;
        lastLuckyNumber: bigint;
        curationScore: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "resignJuryCandidate"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "NewCurationPolicy"
  ): TypedContractEvent<
    NewCurationPolicyEvent.InputTuple,
    NewCurationPolicyEvent.OutputTuple,
    NewCurationPolicyEvent.OutputObject
  >;
  getEvent(
    key: "NewItem"
  ): TypedContractEvent<
    NewItemEvent.InputTuple,
    NewItemEvent.OutputTuple,
    NewItemEvent.OutputObject
  >;
  getEvent(
    key: "NewJuryCandidate"
  ): TypedContractEvent<
    NewJuryCandidateEvent.InputTuple,
    NewJuryCandidateEvent.OutputTuple,
    NewJuryCandidateEvent.OutputObject
  >;
  getEvent(
    key: "NewJuryDraw"
  ): TypedContractEvent<
    NewJuryDrawEvent.InputTuple,
    NewJuryDrawEvent.OutputTuple,
    NewJuryDrawEvent.OutputObject
  >;
  getEvent(
    key: "NewJuryMember"
  ): TypedContractEvent<
    NewJuryMemberEvent.InputTuple,
    NewJuryMemberEvent.OutputTuple,
    NewJuryMemberEvent.OutputObject
  >;
  getEvent(
    key: "ResignJuryCandidate"
  ): TypedContractEvent<
    ResignJuryCandidateEvent.InputTuple,
    ResignJuryCandidateEvent.OutputTuple,
    ResignJuryCandidateEvent.OutputObject
  >;
  getEvent(
    key: "StateChange"
  ): TypedContractEvent<
    StateChangeEvent.InputTuple,
    StateChangeEvent.OutputTuple,
    StateChangeEvent.OutputObject
  >;

  filters: {
    "NewCurationPolicy(uint256,string)": TypedContractEvent<
      NewCurationPolicyEvent.InputTuple,
      NewCurationPolicyEvent.OutputTuple,
      NewCurationPolicyEvent.OutputObject
    >;
    NewCurationPolicy: TypedContractEvent<
      NewCurationPolicyEvent.InputTuple,
      NewCurationPolicyEvent.OutputTuple,
      NewCurationPolicyEvent.OutputObject
    >;

    "NewItem(string,uint256)": TypedContractEvent<
      NewItemEvent.InputTuple,
      NewItemEvent.OutputTuple,
      NewItemEvent.OutputObject
    >;
    NewItem: TypedContractEvent<
      NewItemEvent.InputTuple,
      NewItemEvent.OutputTuple,
      NewItemEvent.OutputObject
    >;

    "NewJuryCandidate(address)": TypedContractEvent<
      NewJuryCandidateEvent.InputTuple,
      NewJuryCandidateEvent.OutputTuple,
      NewJuryCandidateEvent.OutputObject
    >;
    NewJuryCandidate: TypedContractEvent<
      NewJuryCandidateEvent.InputTuple,
      NewJuryCandidateEvent.OutputTuple,
      NewJuryCandidateEvent.OutputObject
    >;

    "NewJuryDraw(string,uint256)": TypedContractEvent<
      NewJuryDrawEvent.InputTuple,
      NewJuryDrawEvent.OutputTuple,
      NewJuryDrawEvent.OutputObject
    >;
    NewJuryDraw: TypedContractEvent<
      NewJuryDrawEvent.InputTuple,
      NewJuryDrawEvent.OutputTuple,
      NewJuryDrawEvent.OutputObject
    >;

    "NewJuryMember(string,address)": TypedContractEvent<
      NewJuryMemberEvent.InputTuple,
      NewJuryMemberEvent.OutputTuple,
      NewJuryMemberEvent.OutputObject
    >;
    NewJuryMember: TypedContractEvent<
      NewJuryMemberEvent.InputTuple,
      NewJuryMemberEvent.OutputTuple,
      NewJuryMemberEvent.OutputObject
    >;

    "ResignJuryCandidate(address)": TypedContractEvent<
      ResignJuryCandidateEvent.InputTuple,
      ResignJuryCandidateEvent.OutputTuple,
      ResignJuryCandidateEvent.OutputObject
    >;
    ResignJuryCandidate: TypedContractEvent<
      ResignJuryCandidateEvent.InputTuple,
      ResignJuryCandidateEvent.OutputTuple,
      ResignJuryCandidateEvent.OutputObject
    >;

    "StateChange(string,uint8)": TypedContractEvent<
      StateChangeEvent.InputTuple,
      StateChangeEvent.OutputTuple,
      StateChangeEvent.OutputObject
    >;
    StateChange: TypedContractEvent<
      StateChangeEvent.InputTuple,
      StateChangeEvent.OutputTuple,
      StateChangeEvent.OutputObject
    >;
  };
}
