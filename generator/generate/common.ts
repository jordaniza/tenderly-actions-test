import axios from "axios";
import { Context } from "@tenderly/actions";
import Lookup from "./lookup.json";
import SampleABI from "./SampleABI.json";

export type ABI = (typeof SampleABI)["abi"];

export const notifyDiscord = async (content: string, context: Context) => {
  console.log("Sending to Discord:", `${content}`);
  const webhookLink = await context.secrets.get("discord.jordanWebhook");
  await axios.post(
    webhookLink,
    { content },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
};

const ROOT = "https://www.4byte.directory/api/v1/";

const selectorToURL = (selector: string, type: "function" | "event") => {
  // strip 0x if present
  if (selector.length === 10) {
    selector = selector.split("0x")[1];
  } else if (selector.length !== 8) {
    throw new Error("Invalid hex string");
  }

  // construct either event or fn endpoint
  const endpoint = `${type === "event" ? "event-signatures" : "signatures"}/?hex_signature=`;
  // return as a valid url
  return ROOT + endpoint + selector;
};

/**
 * Attempt to grab the function name from 4byte.directory using the selector
 * @returns The signature or "Unknown"
 */
const getName4Byte =
  (type: "function" | "event") =>
  async (selector: string): Promise<string> => {
    try {
      const { data } = await axios.get(selectorToURL(selector, type));
      if ("results" in data && Array.isArray(data.results)) {
        return data.results[0].text_signature;
      } else {
        return "Unknown";
      }
    } catch {
      console.warn("Failed to fetch 4byte signature for selector: " + selector);
      return "Unknown";
    }
  };

export const getEventNameFromSelector = getName4Byte("event");
export const getFunctionNameFromSelector = getName4Byte("function");

export const lookupContractAddress = (address: string): string =>
  Lookup[address.toLowerCase() as keyof typeof Lookup] ?? "Unknown";

export const flatten2D = <T>(M: T[][]): T[] => M.reduce((acc, arr) => [...acc, ...arr], []);
export const unique = <T>(arr: T[]): T[] => Array.from(new Set(arr));
