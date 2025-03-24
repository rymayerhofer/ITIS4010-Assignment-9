#!/bin/bash

# Display Node.js and npm versions for debugging
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies including dev dependencies
npm install --include=dev

# Run the build using npx to ensure the correct path to vite
npx vite build
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Build completed successfully!"