#!/bin/bash
set -e

BUCKET_NAME="dygsom-landing-page-dev"
REGION="us-east-1"
PROFILE="${AWS_PROFILE:-dygsom-dev}"
CLOUDFRONT_DISTRIBUTION_ID="E8UFMILPM5WIL"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔨 Building production bundle..."
npm run build

echo "📦 Deploying to S3..."
# Subir todos los archivos con cache largo excepto HTML y favicon
aws s3 sync dist/ s3://$BUCKET_NAME \
  --profile "$PROFILE" \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html" \
  --exclude "favicon*.svg"

# HTML y SVG sin cache para actualizaciones inmediatas
aws s3 sync dist/ s3://$BUCKET_NAME \
  --profile "$PROFILE" \
  --cache-control "no-cache" \
  --exclude "*" \
  --include "*.html" \
  --include "favicon*.svg"

if [[ -f "${SCRIPT_DIR}/apply-security-headers.sh" ]]; then
  echo "Applying CloudFront security headers policy..."
  "${SCRIPT_DIR}/apply-security-headers.sh" "$CLOUDFRONT_DISTRIBUTION_ID" "$PROFILE" || {
    echo "WARNING: Could not apply security headers policy automatically."
    echo "Continue deployment and review CloudFront headers manually."
  }
fi

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --profile "$PROFILE" \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 Site URL: https://www.dygsom.pe"
echo "☁️ CloudFront: https://d3rskao5nrdvou.cloudfront.net"
