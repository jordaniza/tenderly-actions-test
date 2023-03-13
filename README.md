# Tenderly Actions Uploader

Tenderly offers Actions as a set of serverless functions which we can trigger in response to certain happenings on EVM chains. This repo streamlines some of the boilerplate in setting up actions across several contracts, specifically:

- Generating a boilerplate function that sends a discord message in response to a contract event
- Generating the associated `tenderly.yaml` file for the actions

## Setup

Requires Node JS and [Tenderly CLI](https://docs.tenderly.co/web3-actions/references/cli-cheatsheet), for windows looks like you will need WSL

Contracts must be verified on etherscan (or tenderly) and added to the tenderly project you are using. You need to sign in with the tenderly cli.
An `.env` file is required with the following variables:

```
TENDERLY_PROJECT=name/project
DISCORD_WEBHOOK=https://discord.com/api/webhooks/xxxxxxxx

# mainnet
ETHERSCAN_API_KEY=
EXPLORER_API_BASE_URL=https://api.etherscan.io/api
NETWORK_ID=43113
```

Actions files should be placed in the `actions` folder ABIs will are saved in the `artifacts` folder. `npm run generate` can create some boilerplate for you and fetch ABIs, or you can manually add the ABIs to the `artifacts` folder.

A `tenderly.yaml` file must be in the root of the project. This file will be used to upload the actions to tenderly.

If you use [foundry](getfoundry.sh), then you can use the `broadcast-config.ts` file to generate a config starter from the foundry broadcast logs. You'll probably need to edit this to remove nulls and adjust proxies.

## Known issues

- Tenderly rate limits can be a problem with large numbers of actions or contracts. Be mindful of what you actually need.
- This software is a simple utility to make deployment easier to version control and manage. Use at your own risk.
