
import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import { notifyDiscord } from "../local/generate/common";

export const handleAdminSet: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  await notifyDiscord(`"AdminSet" triggered by: ${txEvent.from}`, context);
};
