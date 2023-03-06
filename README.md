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

To use the generator, create a config file in the root of the project `config.json`. The config file should be a JSON file with the following structure:

```json
{
  "contracts": [
    {
      "name": "Auxo",
      "address": "0xFE5AF8235053D5ee46B4f9E042aE390bCfF4Ad2d",
      "events": ["Transfer", "Approval"]
    },
    {
      "name": "ARV",
      "address": "0xdd6532fA9685CFAeAfF221Fe1A43cFbfd0bbBB46"
    }
  ],
  "network": 43113
}
```

`events` is optional, if not provided, all events will be used.

## Running

Read the config file and generate the tenderly code and yaml files:

```
npm run generate
```

Generated files will be placed in the `actions` folder (and saved in the `generated` folder), ABIs will be attempted to be downloaded from etherscan and saved in the `artifacts` folder. If the file can't be downloaded, you can manually add the ABIs to the `artifacts` folder. All contracts must have an ABI file in the `artifacts` folder before we can generate the code.

A `tenderly.yaml` file will be generated in the root of the project. This file will be used to upload the actions to tenderly.

If you use [foundry](getfoundry.sh), then you can use the `broadcast-config.ts` file to generate a config starter from the foundry broadcast logs. You'll probably need to edit this to remove nulls and adjust proxies.

## Known issues

- Tenderly rate limits can be a problem with large numbers of actions or contracts. Be mindful of what you actually need.
- This software is a simple utility to make deployment easier to version control and manage. Use at your own risk.
