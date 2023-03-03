
import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord } from "../local/generate/common";

export const handleBoostedToMax: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"BoostedToMax" triggered by: ${txEvent.from}`, context);
};

export const handleDeposited: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Deposited" triggered by: ${txEvent.from}`, context);
};

export const handleEarlyExit: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"EarlyExit" triggered by: ${txEvent.from}`, context);
};

export const handleEarlyExitFeeChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"EarlyExitFeeChanged" triggered by: ${txEvent.from}`, context);
};

export const handleEjectBufferUpdated: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"EjectBufferUpdated" triggered by: ${txEvent.from}`, context);
};

export const handleEjected: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Ejected" triggered by: ${txEvent.from}`, context);
};

export const handleIncreasedAmount: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"IncreasedAmount" triggered by: ${txEvent.from}`, context);
};

export const handleIncreasedDuration: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"IncreasedDuration" triggered by: ${txEvent.from}`, context);
};

export const handleInitialized: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Initialized" triggered by: ${txEvent.from}`, context);
};

export const handleMigrated: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Migrated" triggered by: ${txEvent.from}`, context);
};

export const handleMigrationEnabledChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"MigrationEnabledChanged" triggered by: ${txEvent.from}`, context);
};

export const handleMigratorUpdated: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"MigratorUpdated" triggered by: ${txEvent.from}`, context);
};

export const handleMinLockAmountChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"MinLockAmountChanged" triggered by: ${txEvent.from}`, context);
};

export const handlePRVAddressChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"PRVAddressChanged" triggered by: ${txEvent.from}`, context);
};

export const handlePenaltyBeneficiaryChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"PenaltyBeneficiaryChanged" triggered by: ${txEvent.from}`, context);
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

export const handleWhitelistedChanged: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"WhitelistedChanged" triggered by: ${txEvent.from}`, context);
};

export const handleWithdrawn: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"Withdrawn" triggered by: ${txEvent.from}`, context);
};
