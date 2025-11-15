#!/bin/bash

# Azure Deployment Script for OCR Calculator

# Variables (CHANGE THESE!)
RESOURCE_GROUP="ocr-calculator-rg"
APP_NAME="ocr-calculator-app"  # Must be globally unique
LOCATION="eastus"
APP_SERVICE_PLAN="ocr-calculator-plan"

echo "🚀 Starting Azure deployment..."

# Create resource group
echo "Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

# Create App Service plan (F1 = Free tier, B1 = Basic $13/month)
echo "Creating App Service plan..."
az appservice plan create \
    --name $APP_SERVICE_PLAN \
    --resource-group $RESOURCE_GROUP \
    --sku F1 \
    --is-linux

# Create web app
echo "Creating Web App..."
az webapp create \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --name $APP_NAME \
    --runtime "DOTNET|8.0"

# Deploy the application
echo "Publishing application..."
cd OCR_Calculator
dotnet publish -c Release -o ./publish

# Create zip file
echo "Creating deployment package..."
cd publish
zip -r ../deploy.zip .
cd ..

# Deploy to Azure
echo "Deploying to Azure..."
az webapp deployment source config-zip \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --src deploy.zip

echo "✅ Deployment complete!"
echo "🌐 Your app is available at: https://$APP_NAME.azurewebsites.net"
