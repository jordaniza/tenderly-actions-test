import fs from "fs/promises";
import dotenv from "dotenv";

import Broadcast from "./latest.json";
import { Config } from "./local/generate/config";

function toConfig(network: number): Config {
  const contracts: any = Broadcast.transactions
    .map((tx) => {
      return (
        tx.transactionType === "CREATE" && {
          name: tx.contractName!,
          address: tx.contractAddress!,
        }
      );
    })
    .filter(Boolean);
  return {
    contracts,
    network,
  };
}

async function main() {
  dotenv.config();
  const config = toConfig(Number(process.env.NETWORK_ID) ?? 1);
  await fs.writeFile("./config-starter.json", JSON.stringify(config, null, 2));
}

main().then(() => process.exit(0));
