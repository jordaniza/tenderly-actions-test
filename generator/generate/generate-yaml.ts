import { lookupContractAddress, unique } from "./common";
import SampleABI from "./SampleABI.json";

type ABI = (typeof SampleABI)["abi"];

export type AddressEventOrFunction = {
  address: string;
  proxyAddress?: string;
  names: string[];
  abi: ABI;
};

function header({ project }: { project: string }) {
  return `
account_id: ""
project_slug: ""
actions:
  ${project}:
    runtime: v2
    sources: actions
    specs:`;
}

function initNewAction({ action, file, description }: { action: string; file: string; description: string }): string {
  return `
      ${action}:
        description: ${description}
        function: ${file}:${action}
        trigger:
          type: transaction
          transaction:
            status:
              - mined
            filters:`;
}

function addEventFilter({
  network,
  address,
  eventOrFunction,
  proxyAddress,
}: {
  network: number;
  address: string;
  eventOrFunction: string;
  proxyAddress?: string;
}): string {
  return `
              - network: ${network}
                eventEmitted:
                  contract:
                    address: "${(proxyAddress ?? address).toLowerCase()}"
                  name: ${eventOrFunction}`;
}

function addFunctionRevertFilter({
  network,
  address,
  proxyAddress,
}: {
  network: number;
  address: string;
  proxyAddress?: string;
}): string {
  return `
              - network: ${network}
                status: fail
                to: "${(proxyAddress ?? address).toLowerCase()}"`;
}

const addEventFilterForContract = ({ names, address, proxyAddress }: AddressEventOrFunction, network: number) =>
  names.map((name) => addEventFilter({ network, address, eventOrFunction: name, proxyAddress }));

// const addFunctionFilterForContract = (
//   { names, address, proxyAddress, abi }: AddressEventOrFunction,
//   network: number
// ) => {
//   if (names.length === 0) {
//     // get all the functions from the abi
//     names = abi.filter((frag) => frag.type === "function").map((frag) => frag.name!);
//   }
//   return names.map((name) => addFunctionRevertFilter({ network, address, eventOrFunction: name, proxyAddress }));
// };

const addFunctionRevertFilterForContract = ({ address, proxyAddress }: AddressEventOrFunction, network: number) => {
  return addFunctionRevertFilter({ network, address, proxyAddress });
};

export function trackMultipleEvents({
  action,
  file,
  network,
  addressEventOrFunctions,
  description,
}: {
  action: string;
  file: string;
  network: number;
  addressEventOrFunctions: AddressEventOrFunction[];
  description: string;
}): string {
  // setup the base
  const base = initNewAction({ action, file, description });

  // the filters for the passed events
  return addressEventOrFunctions.reduce((acc, contract) => {
    const fragments = addEventFilterForContract(contract, network);
    return acc + fragments.join("");
  }, base);
}

export function trackMultipleFunctions({
  action,
  file,
  network,
  addressEventOrFunctions,
  description,
}: {
  action: string;
  file: string;
  network: number;
  addressEventOrFunctions: AddressEventOrFunction[];
  description: string;
}): string {
  // setup the base
  const base = initNewAction({ action, file, description });

  // add all the filters
  return addressEventOrFunctions.reduce((acc, contract) => {
    return acc + addFunctionRevertFilterForContract(contract, network);
  }, base);
}

export const generateFullYAML = ({ slugs, project }: { project: string; slugs: string[] }) =>
  slugs.reduce((acc, slug) => acc + slug, header({ project }));
