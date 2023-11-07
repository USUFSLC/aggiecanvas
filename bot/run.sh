#!/bin/bash

bun run src/index.ts \
  --img julia.png --width 80 --height 80 \
  --node 1 --nnodes 1 --period 100 \
  --grid 1 \
  --topleftx 50 --toplefty 50
