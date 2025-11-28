#!/usr/bin/env node
/**
 * SEO Verification Tool
 * 
 * Script básico para verificar elementos SEO del sitio
 */

const https = require('https');
const { JSDOM } = require('jsdom');

const SITE_URL = 'https://www.dygsom.pe';

async function checkSEO() {
  console.log('🔍 Verificando SEO de DYGSOM...\n');
  
  try {
    const response = await fetch(SITE_URL);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check basic SEO elements
    const title = document.querySelector('title')?.textContent;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const h1 = document.querySelector('h1')?.textContent;
    const images = document.querySelectorAll('img').length;
    const imagesWithAlt = document.querySelectorAll('img[alt]').length;

    console.log('📊 Resultados SEO:');
    console.log('─'.repeat(50));
    console.log(`✅ Title: ${title ? '✓' : '✗'} ${title || 'FALTA'}`);
    console.log(`✅ Meta Description: ${description ? '✓' : '✗'} ${description ? `(${description.length} chars)` : 'FALTA'}`);
    console.log(`✅ H1: ${h1 ? '✓' : '✗'} ${h1 || 'FALTA'}`);
    console.log(`✅ Imágenes: ${images} total, ${imagesWithAlt} con alt text`);
    console.log(`✅ Performance: Verificar en PageSpeed Insights`);
    
    console.log('\n🌐 URLs para verificar:');
    console.log(`- PageSpeed: https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`);
    console.log(`- GTmetrix: https://gtmetrix.com/analyze.html?url=${encodeURIComponent(SITE_URL)}`);

  } catch (error) {
    console.error('❌ Error verificando SEO:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  checkSEO();
}

module.exports = { checkSEO };