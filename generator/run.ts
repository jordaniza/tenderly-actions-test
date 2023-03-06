import SampleABI from "./generate/SampleABI.json";
import fs from "fs/promises";
import {
  generateFullYAML,
  generateYAMLFunctions,
} from "./generate/generate-yaml";
import { generateFunctions } from "./generate/generate-fn";
import { Contract, loadFromConfig } from "./generate/config";
import { fetchAllAbisFromConfig, HandledABI } from "./generate/fetchAbi";

const generate = async (contract: Contract, network: number) => {
  let data: typeof SampleABI;
  try {
    data = JSON.parse(
      await fs.readFile(`./artifacts/${contract.name}.json`, "utf-8")
    );
  } catch (e) {
    throw new Error("No ABI for contract " + contract.name);
  }

  const events = data.abi
    .filter((item) => item.type === "event")
    .filter((event) =>
      contract.events ? contract.events.includes(event.name!) : event
    );
  if (events.length == 0) return;

  const yaml = generateYAMLFunctions({ events, contract, network });
  const functions = generateFunctions(events);

  await Promise.all([
    fs.writeFile(`./generated/tenderly-${contract.name}.yaml`, yaml),
    fs.writeFile(`./generated/${contract.name}.ts`, functions),
  ]);
};

// combine slugs to one file then delete the evidence
const popSlug = async (contract: Contract) => {
  const slug = await fs.readFile(
    `./generated/tenderly-${contract.name}.yaml`,
    "utf-8"
  );
  await fs.rm(`./generated/tenderly-${contract.name}.yaml`);
  return slug;
};

async function writeABIs(abis: HandledABI[]) {
  // if the artifacts folder doesn't exist, create it
  try {
    await fs.access("./artifacts");
  } catch (e) {
    await fs.mkdir("./artifacts");
  }

  const write = async ({ abi, name }: HandledABI) =>
    await fs.writeFile(
      `./artifacts/${name}.json`,
      JSON.stringify({ abi: JSON.parse(abi) }, null, 2)
    );
  await Promise.all(abis.map(write));
}

/// copy utility functions
async function copyCommon() {
  await fs.copyFile("./generator/generate/common.ts", "./generated/common.ts");
}

async function copyTSFiles() {
  const files = await fs.readdir("./generated");
  const promises = [];
  for (const file of files) {
    if (file.endsWith(".ts"))
      promises.push(fs.copyFile(`./generated/${file}`, `./actions/${file}`));
  }
  await Promise.all(promises);
}

async function generateAll() {
  if (!process.env.TENDERLY_PROJECT) {
    throw new Error("TENDERLY_PROJECT not set");
  }
  // load config
  const config = await loadFromConfig();
  const { contracts, network } = config;
  const ABIs = await fetchAllAbisFromConfig(config);

  // clean and recreate generated folder
  await fs.rm("./generated", { recursive: true, force: true });
  await fs.mkdir("./generated");
  await writeABIs(ABIs);

  // generate the functions and yaml fragments
  await Promise.all(contracts.map((contract) => generate(contract, network)));
  await copyCommon();
  const slugs = await Promise.all(contracts.map(popSlug));

  // concatenate into a single file and write
  const full = generateFullYAML({
    slugs,
    project: process.env.TENDERLY_PROJECT,
  });
  await fs.writeFile(`./generated/tenderly.yaml`, full);

  // replace files in actions
  await copyTSFiles();

  // copy the tenderly file
  await fs.copyFile("./generated/tenderly.yaml", "./tenderly.yaml");
}

generateAll().then(() => process.exit(0));
