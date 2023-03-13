import { promises as fs } from "fs";
import { flatten2D, unique } from "./common";

export type Config = {
  actions: Action[];
  network: number;
};

export type Action = {
  listeners: Contract[];
  name: string;
};

export type Contract = {
  name: string;
  address: string;
  events?: string[];
  functions?: string[];
  proxyAddress?: string;
};

type AddressAndName = {
  address: string;
  name: string;
};

export async function loadFromConfig(): Promise<Config> {
  const confFile = await fs.readFile("./config.json", "utf-8");
  return JSON.parse(confFile);
}

const extractAddressesAndName = (conf: Config) =>
  conf.actions.map((action) => action.listeners.map((l) => ({ name: l.name, address: l.address })));
const extractAddressesAndNameWithProxies = (conf: Config) =>
  conf.actions.map((action) => action.listeners.map((l) => ({ name: l.name, address: l.proxyAddress ?? l.address })));

const flattenAddressesAndName = (conf: Config): AddressAndName[] => flatten2D(extractAddressesAndName(conf));
const flattenAddressesAndNameWithProxies = (conf: Config): AddressAndName[] =>
  flatten2D(extractAddressesAndNameWithProxies(conf));

export const uniqueAddressesAndName = (conf: Config): AddressAndName[] => unique(flattenAddressesAndName(conf));
export const uniqueAddressesAndNameWithProxies = (conf: Config): AddressAndName[] =>
  unique(flattenAddressesAndNameWithProxies(conf));
