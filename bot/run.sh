#!/bin/bash

bun run src/index.ts \
  --img fslc.png --width 50 --height 50 \
  --node 1 --nnodes 1 --period 100 \
  --grid 1 \
  --topleftx 170 --toplefty 200
