import fs from "fs/promises";
import {
  AddressEventOrFunction,
  generateFullYAML,
  trackMultipleEvents,
  trackMultipleFunctions,
} from "./generate/generate-yaml";
import { Action, loadFromConfig } from "./generate/config";
import { fetchAllAbisFromConfig, HandledABI } from "./generate/fetchAbi";
import { createLookup } from "./generate/generate-lookup";
import { ABI, lookupContractAddress, unique } from "./generate/common";

async function writeABIs(abis: HandledABI[]) {
  // if the artifacts folder doesn't exist, create it
  await writeIfNotExits("./artifacts", "d");
  const write = async ({ abi, name }: HandledABI) =>
    await fs.writeFile(`./artifacts/${name}.json`, JSON.stringify({ abi: JSON.parse(abi) }, null, 2));
  await Promise.all(abis.map(write));
}

/// copy utility functions
async function copyCommon() {
  await fs.copyFile("./generator/generate/common.ts", "./generated/common.ts");
  await fs.copyFile("./generator/generate/common.ts", "./actions/common.ts");
}

async function writeIfNotExits(name: string, dir: "d" | "f", content: string = ""): Promise<void> {
  try {
    await fs.access(name);
  } catch (e) {
    dir === "d" ? await fs.mkdir(name) : await fs.writeFile(name, content);
  }
}

async function readAbis() {
  const abis = await fs.readdir("./artifacts");
  return abis.map((abi) => JSON.parse(abi));
}

const generate = async ({
  action,
  network,
  file,
  description,
  type,
}: {
  action: Action;
  network: number;
  file: string;
  description: string;
  type: "reverts" | "events";
}) => {
  const addressEventOrFunctions: AddressEventOrFunction[] = await Promise.all(
    action.listeners.map(async ({ address, proxyAddress, events, functions }) => {
      const name = lookupContractAddress(proxyAddress ?? address);
      const abi = await fs.readFile(`./artifacts/${name}.json`, "utf-8");
      return {
        address: proxyAddress ?? address,
        names: events ?? functions ?? [],
        abi: JSON.parse(abi)["abi"] as ABI,
      };
    })
  );

  const yaml = (type === "events" ? trackMultipleEvents : trackMultipleFunctions)({
    action: action.name,
    network,
    addressEventOrFunctions,
    description,
    file,
  });

  await Promise.all([
    fs.writeFile(`./generated/tenderly-${action.name}.yaml`, yaml),
    writeIfNotExits(`./actions/${file}.ts`, "f"),
  ]);
};

// combine slugs to one file then delete the evidence
const popSlug = async (action: Action) => {
  const slug = await fs.readFile(`./generated/tenderly-${action.name}.yaml`, "utf-8");
  await fs.rm(`./generated/tenderly-${action.name}.yaml`);
  return slug;
};

async function generateAll() {
  if (!process.env.TENDERLY_PROJECT) {
    throw new Error("TENDERLY_PROJECT not set");
  }
  // load config
  const config = await loadFromConfig();
  const { actions, network } = config;

  // clean and recreate generated folder
  await fs.rm("./generated", { recursive: true, force: true });
  await fs.mkdir("./generated");

  const ABIs = await fetchAllAbisFromConfig(config);
  await writeABIs(ABIs);

  // create a lookup table for contracts
  const lookup = createLookup(config);
  await fs.writeFile("./generated/lookup.json", JSON.stringify(lookup, null, 2));
  await fs.copyFile("./generated/lookup.json", "./actions/lookup.json");
  await fs.copyFile("./generated/lookup.json", "./generator/generate/lookup.json");

  const roleChange = config.actions.find((a) => a.name === "trackRoleChanges")!;
  const eventsRC = roleChange.listeners.flatMap((l) => l.events ?? []);

  const adminChange = config.actions.find((a) => a.name === "trackAdminChanges")!;
  const eventsAC = adminChange.listeners.flatMap((l) => l.events ?? []);

  const functionReverts = config.actions.find((a) => a.name === "trackFunctionReverts")!;

  // generate the functions and yaml fragments
  await Promise.all([
    generate({
      action: roleChange,
      network,
      file: "RoleChange",
      description: `tracking ${unique(eventsRC).join(", ")} for ${roleChange.listeners.length} contracts`,
      type: "events",
    }),
    generate({
      action: adminChange,
      network,
      file: "AdminChange",
      description: `tracking ${unique(eventsAC).join(", ")} for ${adminChange.listeners.length} contracts`,
      type: "events",
    }),
    generate({
      action: functionReverts,
      network,
      file: "FunctionRevert",
      description: `tracking reverts for ${functionReverts.listeners.length} contracts`,
      type: "reverts",
    }),
  ]);

  await copyCommon();
  const slugs = await Promise.all(actions.map(popSlug));

  // concatenate into a single file and write
  const full = generateFullYAML({
    slugs,
    project: process.env.TENDERLY_PROJECT,
  });
  await fs.writeFile(`./generated/tenderly.yaml`, full);

  // copy the tenderly file
  await fs.copyFile("./generated/tenderly.yaml", "./tenderly.yaml");
}

generateAll().then(() => process.exit(0));
