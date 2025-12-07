# Script para SEO Boost Automático - DYGSOM
$SITE_URL = "https://www.dygsom.pe"
$SITEMAP_URL = "$SITE_URL/sitemap.xml"

Write-Host "🚀 DYGSOM SEO BOOST AUTOMÁTICO" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green

# 1. Verificar que el sitio esté online
Write-Host "`n1. ✅ Verificando que el sitio esté online..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri $SITE_URL -Method HEAD -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Sitio online - Status: $($response.StatusCode)" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error: Sitio no accesible" -ForegroundColor Red
    exit 1
}

# 2. Verificar sitemap
Write-Host "`n2. ✅ Verificando sitemap..." -ForegroundColor Cyan
try {
    $sitemap = Invoke-WebRequest -Uri $SITEMAP_URL -TimeoutSec 10
    if ($sitemap.StatusCode -eq 200) {
        Write-Host "✅ Sitemap accesible - $SITEMAP_URL" -ForegroundColor Green
        $urlCount = ([xml]$sitemap.Content).urlset.url.Count
        Write-Host "📄 URLs en sitemap: $urlCount" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error: Sitemap no accesible" -ForegroundColor Red
}

# 3. Ping a motores de búsqueda
Write-Host "`n3. 🔔 Enviando ping a motores de búsqueda..." -ForegroundColor Cyan

# Ping a Google
try {
    $googlePing = "https://www.google.com/ping?sitemap=$([System.Web.HttpUtility]::UrlEncode($SITEMAP_URL))"
    Invoke-WebRequest -Uri $googlePing -Method GET -TimeoutSec 15 | Out-Null
    Write-Host "✅ Ping enviado a Google" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Error enviando ping a Google" -ForegroundColor Yellow
}

# Ping a Bing
try {
    $bingPing = "https://www.bing.com/ping?sitemap=$([System.Web.HttpUtility]::UrlEncode($SITEMAP_URL))"
    Invoke-WebRequest -Uri $bingPing -Method GET -TimeoutSec 15 | Out-Null
    Write-Host "✅ Ping enviado a Bing" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Error enviando ping a Bing" -ForegroundColor Yellow
}

# 4. Verificar meta tags importantes
Write-Host "`n4. 🔍 Verificando meta tags SEO..." -ForegroundColor Cyan
try {
    $html = Invoke-WebRequest -Uri $SITE_URL
    $content = $html.Content
    
    # Verificar title
    if ($content -match '<title[^>]*>([^<]+)</title>') {
        $title = $matches[1]
        Write-Host "✅ Title: $title" -ForegroundColor Green
        Write-Host "   Longitud: $($title.Length) caracteres" -ForegroundColor Gray
    }
    
    # Verificar meta description
    if ($content -match '<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)["\']') {
        $description = $matches[1]
        Write-Host "✅ Meta Description encontrada" -ForegroundColor Green
        Write-Host "   Longitud: $($description.Length) caracteres" -ForegroundColor Gray
    }
    
    # Verificar structured data
    if ($content -match 'application/ld\+json') {
        Write-Host "✅ Structured Data (JSON-LD) encontrado" -ForegroundColor Green
    }
    
    # Verificar Open Graph
    if ($content -match 'property=["\']og:') {
        Write-Host "✅ Open Graph meta tags encontrados" -ForegroundColor Green
    }
    
} catch {
    Write-Host "⚠️  Error verificando meta tags" -ForegroundColor Yellow
}

# 5. Generar reporte de velocidad
Write-Host "`n5. ⚡ Generando URLs para testing..." -ForegroundColor Cyan

$testUrls = @(
    "https://pagespeed.web.dev/analysis?url=$([System.Web.HttpUtility]::UrlEncode($SITE_URL))"
    "https://search.google.com/test/rich-results?url=$([System.Web.HttpUtility]::UrlEncode($SITE_URL))"
    "https://search.google.com/test/mobile-friendly?url=$([System.Web.HttpUtility]::UrlEncode($SITE_URL))"
    "https://validator.schema.org/#url=$([System.Web.HttpUtility]::UrlEncode($SITE_URL))"
)

Write-Host "`n📊 URLs para verificar SEO:" -ForegroundColor Yellow
foreach ($url in $testUrls) {
    Write-Host "   $url" -ForegroundColor Gray
}

# 6. Social Media URLs para compartir
Write-Host "`n📱 URLs para compartir en redes sociales:" -ForegroundColor Yellow

$socialTexts = @{
    "LinkedIn" = "🇵🇪 DYGSOM: IA antifraude entrenada para Perú y LATAM. Reduce falsos positivos 70%, recupera ventas legítimas rechazadas. Entiende el contexto local que otros sistemas no ven. $SITE_URL"
    "Twitter" = "🛡️ ¿Tu e-commerce rechaza clientes legítimos? DYGSOM con IA para LATAM reduce falsos positivos 70%. Entiende direcciones SJL, VMT, horarios locales. Análisis gratis: $SITE_URL #antifraude #ecommerce #peru"
    "Facebook" = "🔍 Sistemas tradicionales rechazan 8% de clientes peruanos legítimos. DYGSOM con IA local recupera esas ventas. MVP en piloto, buscamos early adopters. ¡Descubre cómo! $SITE_URL"
}

foreach ($platform in $socialTexts.Keys) {
    Write-Host "`n$platform:" -ForegroundColor Cyan
    Write-Host "   $($socialTexts[$platform])" -ForegroundColor Gray
}

# 7. Acciones manuales requeridas
Write-Host "`n🎯 ACCIONES MANUALES REQUERIDAS:" -ForegroundColor Red
Write-Host "=================================" -ForegroundColor Red
Write-Host "1. Google Search Console: https://search.google.com/search-console" -ForegroundColor Yellow
Write-Host "2. Verificar propiedad del sitio" -ForegroundColor Yellow  
Write-Host "3. Enviar sitemap: $SITEMAP_URL" -ForegroundColor Yellow
Write-Host "4. Solicitar indexación manual de la URL principal" -ForegroundColor Yellow
Write-Host "5. Compartir en redes sociales usando los textos generados" -ForegroundColor Yellow
Write-Host "6. Crear perfiles en Crunchbase, AngelList, etc." -ForegroundColor Yellow

Write-Host "`n🎉 SEO BOOST COMPLETADO!" -ForegroundColor Green
Write-Host "Revisa los resultados en 24-48 horas." -ForegroundColor Green