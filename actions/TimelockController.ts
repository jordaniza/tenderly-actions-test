
import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord } from "./common";

export const handleCallExecuted: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"CallExecuted" triggered by: ${txEvent.from}`, context);
};

export const handleCallSalt: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"CallSalt" triggered by: ${txEvent.from}`, context);
};

export const handleCallScheduled: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"CallScheduled" triggered by: ${txEvent.from}`, context);
};

export const handleCancelled: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Cancelled" triggered by: ${txEvent.from}`, context);
};

export const handleMinDelayChange: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"MinDelayChange" triggered by: ${txEvent.from}`, context);
};

export const handleRoleAdminChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"RoleAdminChanged" triggered by: ${txEvent.from}`, context);
};

export const handleRoleGranted: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"RoleGranted" triggered by: ${txEvent.from}`, context);
};

export const handleRoleRevoked: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"RoleRevoked" triggered by: ${txEvent.from}`, context);
};
