import { ActionFn, Context, Event, BlockEvent } from "@tenderly/actions";

export const logger: ActionFn = async (_: Context, event: Event) => {
  let blockEvent = event as BlockEvent;
  console.log(`Logged Block Number ${blockEvent.blockNumber}`);
};
