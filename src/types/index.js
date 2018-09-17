// @flow

export type Tab = {
  id: string,
  title: string,
  url: string,
  favIconUrl: string,
  pinned: boolean
};

export type UnknownGroup = {
  name: string,
  tabs: Array<Tab>
};

export type GroupId = string;

export type Group = {
  id: GroupId,
  name: string,
  tabs: Array<Tab>
};

export type Action<TypeLiteral, Payload> = {
  type: TypeLiteral,
  payload: Payload
};
