#!/bin/sh

# https://docs.tenderly.co/web3-actions/references/cli-cheatsheet
# run within the folder containing tenderly.yaml

# Build the project (optional)
tenderly actions build

# Publish the project to Tenderly without running it (start manually)
tenderly actions publish

# Deploy the project to Tenderly Runtime (or re-deploy any changes you make)
tenderly actions deploy
