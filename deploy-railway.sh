#!/bin/bash

# Railway Deployment Script for OCR Calculator
# This is the EASIEST way to deploy!

echo "🚂 Railway Deployment - OCR Calculator"
echo "========================================"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null
then
    echo "⚠️  Railway CLI not found. Installing..."
    brew install railway
fi

# Check if logged in
if ! railway whoami &> /dev/null
then
    echo "🔐 Please login to Railway..."
    railway login
fi

echo ""
echo "📦 Deploying to Railway..."
echo ""

# Navigate to project root
cd "$(dirname "$0")"

# Initialize Railway project if not already done
if [ ! -f "railway.json" ]; then
    echo "🎯 Initializing Railway project..."
    railway init
fi

# Deploy!
echo "🚀 Uploading and building..."
railway up

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 To get your public URL, run:"
echo "   railway domain"
echo ""
echo "📊 To view logs, run:"
echo "   railway logs"
echo ""
echo "💡 To open in browser, run:"
echo "   railway open"
