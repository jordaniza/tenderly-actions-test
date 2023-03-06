import {
  TestBlockEvent,
  TestRuntime,
  TestTransactionEvent,
} from "@tenderly/actions-test";
import { logger } from "../actions/blockNumberLogger";
import { newAdmin } from "../actions/onAdminChange";

/*
 * Running Web3 Actions code locally.
 * TestRuntime is a helper class that allows you to run the functions,
 * and set storage and secrets before running the function
 **/
describe("Testing the runtime", () => {
  let testRuntime: TestRuntime;

  beforeEach(() => {
    testRuntime = new TestRuntime();
  });

  it("should run the logger", async () => {
    const logSpy = jest.spyOn(console, "log");

    const block = new TestBlockEvent();
    for (let i = 0; i < 10; i++) {
      block.blockNumber++;
      await testRuntime.execute(logger, block);
      expect(logSpy).toHaveBeenCalledWith(
        `Logged Block Number ${block.blockNumber}`
      );
    }
  });

  it("should notify the admin changed event", async () => {
    const event = new TestTransactionEvent();
    event.from = "TEST";
    if (!process.env.DISCORD_WEBHOOK) throw new Error("No webhook");
    testRuntime.context.secrets.put(
      "discord.jordanWebhook",
      process.env.DISCORD_WEBHOOK
    );

    await testRuntime.execute(newAdmin, event);
  });
});
