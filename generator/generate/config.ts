import { promises as fs } from "fs";

export type Config = {
  contracts: Contract[];
  network: number;
};

export type Contract = {
  name: string;
  address: string;
  events?: string[];
  proxyAddress?: string;
};

export async function loadFromConfig(): Promise<Config> {
  const confFile = await fs.readFile("./config.json", "utf-8");
  return JSON.parse(confFile);
}
