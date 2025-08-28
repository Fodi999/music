const sharp = require('sharp');

// Создаем простой favicon в виде градиентного круга
const createFavicon = async () => {
  // Создаем SVG
  const svg = `
    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff00ff;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" fill="#0a0a0a"/>
      <circle cx="16" cy="16" r="12" fill="url(#grad)"/>
      <circle cx="16" cy="16" r="8" fill="#0a0a0a"/>
      <circle cx="16" cy="16" r="4" fill="url(#grad)"/>
    </svg>
  `;

  try {
    // Конвертируем SVG в PNG
    await sharp(Buffer.from(svg))
      .resize(32, 32)
      .png()
      .toFile('public/favicon.png');
    
    // Создаем Apple Touch Icon
    await sharp(Buffer.from(svg))
      .resize(180, 180)
      .png()
      .toFile('public/apple-touch-icon.png');
    
    console.log('✅ Favicon файлы созданы успешно!');
  } catch (error) {
    console.error('❌ Ошибка создания favicon:', error);
  }
};

createFavicon();
