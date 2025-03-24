#!/bin/bash

# Display Node.js and npm versions for debugging
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies including dev dependencies
npm install --include=dev

# Clean dist directory if it exists
rm -rf dist
mkdir -p dist

# Update the vite config to output directly to dist
echo "Building client..."
# Set outDir to ./dist instead of default ./dist/public
VITE_BUILD_OUTDIR=dist npx vite build --outDir dist

# Copy asset directories that might be needed
echo "Copying public assets..."
cp -r client/public/* dist/ || true

# Prep for functions
echo "Building serverless functions..."
# Ensure netlify/functions directory exists
mkdir -p netlify/functions
cp -r netlify/functions/* netlify/functions/ || true

# Create a simple redirects file for SPAs
echo "/* /index.html 200" > dist/_redirects

echo "Build completed successfully!"