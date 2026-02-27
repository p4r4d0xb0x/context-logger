#!/bin/bash
# Quick install script for Context Logger

set -e

echo "🥞 Installing Context Logger..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Clone or install from npm (when published)
if [ -d "$HOME/context-logger" ]; then
    echo "📦 Updating existing installation..."
    cd "$HOME/context-logger"
    git pull
else
    echo "📦 Cloning repository..."
    git clone https://github.com/p4r4d0xb0x/context-logger.git "$HOME/context-logger"
    cd "$HOME/context-logger"
fi

echo "📦 Installing dependencies..."
npm install

echo "🔗 Linking globally..."
npm link

echo ""
echo "✅ Context Logger installed!"
echo ""
echo "Try it:"
echo "  cd your-git-project"
echo "  context-logger today"
echo "  context-logger summary"
echo ""
echo "For AI-powered summaries, set ANTHROPIC_API_KEY in your environment."
echo ""
