import { TestBlockEvent, TestRuntime, TestTransactionEvent } from "@tenderly/actions-test";
import { trackRoleChanges } from "../actions/RoleChange";

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

  it("should notify the admin changed event", async () => {
    const event = new TestTransactionEvent();
    event.from = "TEST";
    event.input =
      "0xd547741f29944e936a0f6e1cbaa227df218d7d6025c2a2785db840e42a3425f24e9e68ac000000000000000000000000f52c4d4f80f570ffda7cb4ee1476125fbcc0fe3c";
    if (!process.env.DISCORD_WEBHOOK) throw new Error("No webhook");
    testRuntime.context.secrets.put("discord.jordanWebhook", process.env.DISCORD_WEBHOOK);

    await testRuntime.execute(trackRoleChanges, event);
  });
});
