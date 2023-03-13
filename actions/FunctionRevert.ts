import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord, lookupContractAddress, getFunctionNameFromSelector } from "./common";

export const trackFunctionReverts: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  const hex = txEvent.input.slice(0, 10);
  const fnName = await getFunctionNameFromSelector(hex);
  const contractName = txEvent.to && lookupContractAddress(txEvent.to.toLowerCase() ?? "");
  await notifyDiscord(
    `Alert: Function Revert at **${contractName}[${txEvent.to}]**: **"${fnName}"[${hex}]** initiated by ${txEvent.from}`,
    context
  );
};
