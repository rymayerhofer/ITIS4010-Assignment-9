#!/bin/bash

# Display Node.js and npm versions for debugging
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies including dev dependencies
npm install --include=dev

# Clean dist directory if it exists
rm -rf dist
mkdir -p dist

# Build the client
echo "Building client..."
npx vite build

# Reorganize the output files for Netlify
echo "Reorganizing build output for Netlify..."
# Move all files from dist/public to dist
mv dist/public/* dist/

# Copy asset directories that might be needed
echo "Copying additional public assets..."
cp -r client/public/* dist/ || true

# Prep for functions
echo "Building serverless functions..."
# Ensure netlify/functions directory exists
mkdir -p netlify/functions

# Create a simple redirects file for SPAs
echo "/* /index.html 200" > dist/_redirects

echo "Build completed successfully!"