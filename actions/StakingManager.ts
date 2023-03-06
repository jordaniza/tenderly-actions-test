
import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord } from "./common";

export const handleAuxoApproval: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"AuxoApproval" triggered by: ${txEvent.from}`, context);
};

export const handleInitialized: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Initialized" triggered by: ${txEvent.from}`, context);
};

export const handleRepresentativeChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"RepresentativeChanged" triggered by: ${txEvent.from}`, context);
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
