import { Contract } from "./config";
import SampleABI from "./SampleABI.json";
type ABI = (typeof SampleABI)["abi"];

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

function insert({
  name,
  network,
  address,
  event,
  contractName,
  proxyAddress,
}: {
  name: string;
  network: number;
  address: string;
  contractName: string;
  event: string;
  proxyAddress?: string;
}): string {
  const fragment = `
      ${contractName}-${name}:
        description: "Activated on ${event}"
        function: ${contractName}:handle${event}
        trigger:
          type: transaction
          transaction:
            status:
              - mined
            filters:
              - network: ${network}
                eventEmitted:
                  contract:
                    address: "${proxyAddress ?? address}"
                  name: ${event}`;
  return fragment;
}

export const generateYAMLFunctions = ({
  events,
  contract,
  network,
}: {
  events: ABI;
  network: number;
  contract: Contract;
}) =>
  events.reduce((acc, event) => {
    return (acc += insert({
      name: event.name!,
      network,
      address: contract.address,
      contractName: contract.name,
      event: event.name!,
      proxyAddress: contract?.proxyAddress,
    }));
  }, "");

export const generateFullYAML = ({
  slugs,
  project,
}: {
  project: string;
  slugs: string[];
}) => slugs.reduce((acc, slug) => acc + slug, header({ project }));
