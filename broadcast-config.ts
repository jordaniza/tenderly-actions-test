import fs from "fs/promises";
import dotenv from "dotenv";

// change if needed
import Broadcast from "./latest.json";

// convert foundry broadcast log to a list of contracts and addresses
function toConfig(network: number) {
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
