import SampleABI from "./SampleABI.json";
type ABI = (typeof SampleABI)["abi"];

const functionImports = `
import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord } from "./common";
`;

function tsFunction({ event }: { event: string }) {
  return `
export const handle${event}: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(\`"${event}" triggered by: \${txEvent.from}\`, context);
};
`;
}

export const generateFunctions = (events: ABI) =>
  events.reduce((acc, event) => {
    return (acc += tsFunction({ event: event.name! }));
  }, functionImports);
