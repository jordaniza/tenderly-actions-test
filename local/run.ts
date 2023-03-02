import { TestBlockEvent, TestRuntime } from "@tenderly/actions-test";
import { logger } from "../actions/blockNumberLogger";

/*
 * Running Web3 Actions code locally.
 * TestRuntime is a helper class that allows you to run the functions,
 * and set storage and secrets before running the function
 **/
const main = async () => {
  const testRuntime = new TestRuntime();

  const block = new TestBlockEvent();
  for (let i = 0; i < 10; i++) {
    block.blockNumber++;
    await testRuntime.execute(logger, block);
  }
};

main().then(() => process.exit(0));
