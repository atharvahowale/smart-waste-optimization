#!/bin/bash

# Installation script for Smart Plastic Waste Collection Optimization Platform
# SIH 2026 Project

set -e  # Exit on error

echo "=========================================="
echo "Smart Waste Collection Optimization"
echo "Installation Script"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo ""
    echo "Please install Node.js first:"
    echo "  Option 1 (NVM): curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "  Option 2 (Direct): Visit https://nodejs.org/"
    echo ""
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old (v$NODE_VERSION)"
    echo "Please upgrade to Node.js v18 or higher"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "This may take 1-3 minutes..."
echo ""

if npm install; then
    echo ""
    echo "✅ Dependencies installed successfully!"
else
    echo ""
    echo "❌ Installation failed"
    echo "Try: rm -rf node_modules package-lock.json && npm install"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Installation Complete!"
echo "=========================================="
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "For mobile access on same network:"
echo "  npm run dev -- --host"
echo ""
echo "For production build:"
echo "  npm run build"
echo "  npm run preview"
echo ""
echo "Happy optimizing! 🚀"
