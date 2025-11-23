#!/bin/bash
set -e

BUCKET_NAME="dygsom-landing-page-dev"
REGION="us-east-1"

echo "🔨 Building production bundle..."
npm run build

echo "📦 Deploying to S3..."
# Subir todos los archivos con cache largo excepto HTML y favicon
aws s3 sync dist/ s3://$BUCKET_NAME \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "favicon*.svg"

# HTML y SVG sin cache para actualizaciones inmediatas
aws s3 sync dist/ s3://$BUCKET_NAME \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html" \
  --include "favicon*.svg"

echo "✅ Deployment complete!"
echo "🌐 Site URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
