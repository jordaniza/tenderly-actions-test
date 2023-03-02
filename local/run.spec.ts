import { TestBlockEvent, TestRuntime } from "@tenderly/actions-test";
import { logger } from "../actions/blockNumberLogger";

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
});
