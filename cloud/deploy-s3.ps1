# Script de despliegue a S3 para Windows PowerShell
$BUCKET_NAME = "dygsom-landing-page-dev"
$REGION = "us-east-1"
$PROFILE = "dygsom-dev"
$CLOUDFRONT_DISTRIBUTION_ID = "E8UFMILPM5WIL"

Write-Host "Building production bundle..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Deploying to S3..." -ForegroundColor Cyan

# Subir todos los archivos con cache largo excepto HTML y favicon
aws s3 sync dist/ s3://$BUCKET_NAME `
  --profile $PROFILE `
  --delete `
  --cache-control "public, max-age=31536000" `
  --exclude "index.html" `
  --exclude "favicon*.svg"

# HTML y SVG sin cache para actualizaciones inmediatas
aws s3 sync dist/ s3://$BUCKET_NAME `
  --profile $PROFILE `
  --cache-control "no-cache" `
  --exclude "*" `
  --include "*.html" `
  --include "favicon*.svg"

if ($LASTEXITCODE -eq 0) {
    Write-Host "S3 deployment complete!" -ForegroundColor Green
    
    Write-Host "Invalidating CloudFront cache..." -ForegroundColor Cyan
    aws cloudfront create-invalidation `
      --profile $PROFILE `
      --distribution-id $CLOUDFRONT_DISTRIBUTION_ID `
      --paths "/*"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "CloudFront cache invalidated!" -ForegroundColor Green
        Write-Host "Site URL: https://www.dygsom.pe" -ForegroundColor Yellow
        Write-Host "CloudFront: https://d3rskao5nrdvou.cloudfront.net" -ForegroundColor Yellow
    } else {
        Write-Host "CloudFront invalidation failed, but site is deployed" -ForegroundColor Yellow
    }
} else {
    Write-Host "Deployment failed!" -ForegroundColor Red
    exit 1
}
