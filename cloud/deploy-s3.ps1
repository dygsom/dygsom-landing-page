# Script de despliegue a S3 para Windows PowerShell
$BUCKET_NAME = "dygsom-landing-page-dev"
$REGION = "us-east-1"
$PROFILE = "dygsom-dev"
$CLOUDFRONT_DISTRIBUTION_ID = "E8UFMILPM5WIL"
$SECURITY_HEADERS_SCRIPT = Join-Path $PSScriptRoot "apply-security-headers.ps1"

# Obtener el directorio raíz del proyecto
$PROJECT_ROOT = Split-Path -Parent $PSScriptRoot
$DIST_PATH = Join-Path $PROJECT_ROOT "dist"

Write-Host "Building production bundle..." -ForegroundColor Cyan
Set-Location $PROJECT_ROOT
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "Deploying to S3..." -ForegroundColor Cyan

# Subir todos los archivos con cache largo excepto HTML y favicon
aws s3 sync $DIST_PATH s3://$BUCKET_NAME `
  --profile $PROFILE `
  --delete `
  --cache-control "public, max-age=31536000" `
  --exclude "index.html" `
  --exclude "favicon*.svg"

# HTML y SVG sin cache para actualizaciones inmediatas
aws s3 sync $DIST_PATH s3://$BUCKET_NAME `
  --profile $PROFILE `
  --cache-control "no-cache" `
  --exclude "*" `
  --include "*.html" `
  --include "favicon*.svg"

if ($LASTEXITCODE -eq 0) {
    Write-Host "S3 deployment complete!" -ForegroundColor Green

    if (Test-Path $SECURITY_HEADERS_SCRIPT) {
        Write-Host "Applying CloudFront security headers policy..." -ForegroundColor Cyan
        try {
            & $SECURITY_HEADERS_SCRIPT -DistributionId $CLOUDFRONT_DISTRIBUTION_ID -Profile $PROFILE
        } catch {
            Write-Host "Security headers policy update failed: $($_.Exception.Message)" -ForegroundColor Yellow
            Write-Host "Deployment continues, but review CloudFront headers manually." -ForegroundColor Yellow
        }
    } else {
        Write-Host "Security headers script not found: $SECURITY_HEADERS_SCRIPT" -ForegroundColor Yellow
    }
    
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
