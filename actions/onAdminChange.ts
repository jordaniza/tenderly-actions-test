import { ActionFn, Context, Event, TransactionEvent } from "@tenderly/actions";
import axios from "axios";

const notifyDiscord = async (text: string, context: Context) => {
  console.log("Sending to Discord:", `🐥 ${text}`);
  const webhookLink = await context.secrets.get("discord.jordanWebhook");
  await axios.post(
    webhookLink,
    {
      content: `🐥 ${text}`,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

export const newAdmin: ActionFn = async (context: Context, event: Event) => {
  const txEvent = event as TransactionEvent;
  console.log({ txEvent });
  await notifyDiscord(`New admin set by: ${txEvent.from}`, context);
};
