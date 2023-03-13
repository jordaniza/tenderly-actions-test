import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { Config, uniqueAddressesAndName } from "./config";

dotenv.config();

export type HandledABI = { name: string; abi: string };

async function getAbi(address: string) {
  let url = process.env.EXPLORER_API_BASE_URL ?? "https://api.etherscan.io/api";
  url += "?module=contract&action=getabi";
  url += `&address=${address}`;
  url += `&apikey=${process.env.ETHERSCAN_API_KEY}`;
  return await axios.get(url);
}

export async function fetchAllAbisFromConfig(conf: Config): Promise<HandledABI[]> {
  const addressAndNames = uniqueAddressesAndName(conf);

  // break up the requests into batches of 5
  // and execute with a one second delay in between to avoid timeouts
  const results = [] as PromiseSettledResult<AxiosResponse>[];
  for (let i = 0; i < addressAndNames.length; i += 5) {
    const results = await Promise.allSettled(
      addressAndNames.slice(i, i + 5).map(async ({ address }) => await getAbi(address))
    );
    results.push(...results);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return results
    .map((result, i) => handleAllSettled(result, addressAndNames[i].name))
    .filter((abi) => abi !== undefined) as HandledABI[];
}

function handleAllSettled(result: PromiseSettledResult<AxiosResponse>, contractName: string) {
  if (result.status === "fulfilled" && result.value.data.status === "1") {
    return {
      name: contractName,
      abi: result.value.data.result,
    };
  } else if (result.status === "fulfilled" && result.value.data.status === "0") {
    const warningMessage = `Warning: ${contractName} failed to fetch ABI from etherscan - ${result.value.data.result}`;
    // warn in yellow
    console.warn("\x1b[33m%s\x1b[0m", warningMessage);
  } else {
    const errorMessage = `Error: ${contractName} failed to fetch ABI from etherscan`;
    // error in red
    console.error("\x1b[31m%s\x1b[0m", errorMessage);
  }
  return undefined;
}
