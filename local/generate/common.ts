import { Context } from "@tenderly/actions";
import axios from "axios";

export const notifyDiscord = async (text: string, context: Context) => {
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
