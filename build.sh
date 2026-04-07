#!/bin/bash
export VITE_DEPLOYED_AT=$(date -u +%Y-%m-%dT%H:%M:%SZ)
pnpm run build
