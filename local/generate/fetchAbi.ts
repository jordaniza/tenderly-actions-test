import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
import { Config } from "./config";

dotenv.config();

async function getAbi(address: string) {
  let url = process.env.EXPLORER_API_BASE_URL ?? "https://api.etherscan.io/api";
  url += "?module=contract&action=getabi";
  url += `&address=${address}`;
  url += `&apikey=${process.env.ETHERSCAN_API_KEY}`;
  return await axios.get(url);
}

export type HandledABI = { name: string; abi: string };

export async function fetchAllAbisFromConfig(
  conf: Config
): Promise<HandledABI[]> {
  const results = await Promise.allSettled(
    conf.contracts.map(async (contract) => await getAbi(contract.address))
  );
  return results
    .map((result, i) => handleAllSettled(result, conf.contracts[i].name))
    .filter((abi) => abi !== undefined) as HandledABI[];
}

function handleAllSettled(
  result: PromiseSettledResult<AxiosResponse>,
  contractName: string
) {
  if (result.status === "fulfilled" && result.value.data.status === "1") {
    return {
      name: contractName,
      abi: result.value.data.result,
    };
  } else if (
    result.status === "fulfilled" &&
    result.value.data.status === "0"
  ) {
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
