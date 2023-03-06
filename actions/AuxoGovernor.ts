
import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord } from "./common";

export const handleProposalCanceled: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"ProposalCanceled" triggered by: ${txEvent.from}`, context);
};

export const handleProposalCreated: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"ProposalCreated" triggered by: ${txEvent.from}`, context);
};

export const handleProposalExecuted: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"ProposalExecuted" triggered by: ${txEvent.from}`, context);
};

export const handleProposalQueued: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"ProposalQueued" triggered by: ${txEvent.from}`, context);
};

export const handleProposalThresholdSet: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"ProposalThresholdSet" triggered by: ${txEvent.from}`, context);
};

export const handleQuorumNumeratorUpdated: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"QuorumNumeratorUpdated" triggered by: ${txEvent.from}`, context);
};

export const handleTimelockChange: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"TimelockChange" triggered by: ${txEvent.from}`, context);
};

export const handleVoteCast: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"VoteCast" triggered by: ${txEvent.from}`, context);
};

export const handleVoteCastWithParams: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"VoteCastWithParams" triggered by: ${txEvent.from}`, context);
};

export const handleVotingDelaySet: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"VotingDelaySet" triggered by: ${txEvent.from}`, context);
};

export const handleVotingPeriodSet: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"VotingPeriodSet" triggered by: ${txEvent.from}`, context);
};
