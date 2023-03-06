
import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord } from "./common";

export const handleApproval: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Approval" triggered by: ${txEvent.from}`, context);
};

export const handleDelegateChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"DelegateChanged" triggered by: ${txEvent.from}`, context);
};

export const handleDelegateVotesChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"DelegateVotesChanged" triggered by: ${txEvent.from}`, context);
};

export const handleTransfer: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Transfer" triggered by: ${txEvent.from}`, context);
};
