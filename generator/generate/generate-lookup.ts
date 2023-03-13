import { Config } from "./config";
import { uniqueAddressesAndNameWithProxies } from "./config";

export function createLookup(conf: Config): Record<string, string> {
  const addrs = uniqueAddressesAndNameWithProxies(conf);
  return addrs.reduce((acc, { address, name }) => ({ ...acc, [address.toLowerCase()]: name }), {});
}
