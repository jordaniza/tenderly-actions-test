import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord, getEventNameFromSelector, lookupContractAddress } from "./common";

export const trackRoleChanges: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  const hex = txEvent.input.slice(0, 10);
  const eventName = await getEventNameFromSelector(hex);
  const contractName = txEvent.to && lookupContractAddress(txEvent.to.toLowerCase() ?? "");
  await notifyDiscord(
    `Alert: Role Updated at **${contractName}[${txEvent.to}]**: **"${eventName}"[${hex}]** initiated by ${txEvent.from}`,
    context
  );
};
