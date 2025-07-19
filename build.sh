#!/bin/bash

# This script prepares the app for deployment on Vercel

# Create a build directory
mkdir -p build

# Copy the runtime files to the build directory
cp -r app-builder/runtime/* build/

# Copy the public redirects file
cp app-builder/runtime/public/_redirects build/public/

echo "Build preparation complete. Files are ready in the 'build' directory."