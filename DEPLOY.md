# NEXUS Music - Electronic Music Producer Website

🎵 **Современный сайт-визитка электронного музыканта с интеграцией MusicBrainz API**

[🚀 Live Demo](https://nexus-music-website.vercel.app) | [📱 GitHub](https://github.com/Fodi999/music)

## 🌟 Особенности

### 🎨 **Современный дизайн**
- Неоновая цветовая схема в киберпанк стиле
- Адаптивный дизайн для всех устройств
- Плавные анимации с Framer Motion
- Градиенты и эффекты свечения

### 🎵 **Музыкальный плеер**
- Интерактивный плеер с визуализацией звука
- Плейлист из 10 треков
- Функции воспроизведения: play/pause, next/prev, shuffle, repeat
- Система лайков треков
- Прогресс бар и контроль громкости

### 🔍 **Поиск музыки (MusicBrainz API)**
- Поиск артистов по всему миру
- Поиск треков и альбомов
- Детальная информация об исполнителях
- Демо-режим с примером поиска Queen
- API routes для избежания CORS

### 📱 **Страницы**
- **Главная**: Hero секция с навигацией
- **О музыканте**: Биография и стиль
- **Музыка**: Дискография и релизы
- **Плеер**: Полнофункциональный музыкальный плеер
- **Плейлист**: Интерактивный список треков
- **Поиск**: MusicBrainz интеграция с демо
- **Туры**: Расписание концертов
- **Контакты**: Форма обратной связи и соцсети

## 🛠 Технологии

### **Frontend**
- **Next.js 14** (App Router)
- **TypeScript** для типобезопасности
- **Tailwind CSS** для стилизации
- **Framer Motion** для анимаций
- **Lucide React** для иконок
- **shadcn/ui** компоненты

### **API & Интеграции**
- **MusicBrainz API** для музыкальных данных
- **Next.js API Routes** для серверной логики
- **Cover Art Archive** для обложек альбомов

### **Deployment**
- **Vercel** для хостинга и CI/CD
- **ESLint** для линтинга
- **Optimized CSS** и JavaScript

## 🚀 Быстрый старт

### Установка
\`\`\`bash
# Клонировать репозиторий
git clone https://github.com/Fodi999/music.git
cd music

# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev
\`\`\`

### Скрипты
\`\`\`bash
npm run dev          # Режим разработки (http://localhost:3000)
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен сборки
npm run lint         # Проверка кода ESLint
\`\`\`

## 🎵 Плейлист треков

1. **Neon Dreams** - NEXUS (Synthwave, 4:32)
2. **Cyberpunk City** - NEXUS ft. Alex Synth (Future Bass, 5:18)
3. **Digital Horizon** - NEXUS (Ambient, 4:20)
4. **Quantum Bass** - NEXUS ft. Future Dynamics (Bass, 3:45)
5. **Synthwave Nights** - NEXUS (Synthwave, 6:12)
6. **Future Waves** - NEXUS (Future Bass, 5:12)
7. **Electric Storm** - NEXUS ft. Lightning (Electro, 4:45)
8. **Midnight Drive** - NEXUS (Synthwave, 5:30)
9. **Binary Dreams** - NEXUS ft. Code Runner (Techno, 3:58)
10. **Crystal Frequencies** - NEXUS (Ambient, 4:18)

## 🔌 API Endpoints

### Music Search API
\`\`\`typescript
GET /api/music?q={query}&type={artist|recording|release}
GET /api/music/artist/{artistId}/releases
\`\`\`

### Примеры использования
\`\`\`javascript
// Поиск артистов
const artists = await fetch('/api/music?q=queen&type=artist')

// Поиск треков
const tracks = await fetch('/api/music?q=bohemian rhapsody&type=recording')

// Альбомы артиста
const albums = await fetch('/api/music/artist/{artistId}/releases')
\`\`\`

## 🌈 Цветовая схема

- **Основной неон**: \`#00ffff\` (cyan)
- **Акцент**: \`#ff00ff\` (magenta)
- **Дополнительный**: \`#9d4edd\` (purple)
- **Фон**: \`#0a0a0a\` до \`#1a1a1a\` (градиент)

## 📱 Адаптивность

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px  
- **Mobile**: 320px - 767px

## 🔧 Конфигурация

### Next.js
\`\`\`javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'coverartarchive.org']
  }
}
\`\`\`

### Vercel
\`\`\`json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
\`\`\`

## 🚀 Деплой на Vercel

1. **Подключить GitHub репозиторий** к Vercel
2. **Настроить переменные окружения** (если нужны)
3. **Deploy** автоматически при push в main

\`\`\`bash
# Или через Vercel CLI
npm i -g vercel
vercel --prod
\`\`\`

## 📈 Производительность

- **Lighthouse Score**: 95+ 
- **First Load JS**: ~87.1 kB
- **Static Generation** для оптимальной скорости
- **Image Optimization** с Next.js Image

## 🔍 SEO

- **Metadata** для всех страниц
- **Open Graph** теги
- **Structured Data** для музыки
- **Sitemap.xml** и **robots.txt**

## 🤝 Вклад в проект

1. Fork репозиторий
2. Создайте feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit изменения (\`git commit -m 'Add AmazingFeature'\`)
4. Push в branch (\`git push origin feature/AmazingFeature\`)
5. Создайте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл

## 👨‍💻 Автор

**NEXUS** - Electronic Music Producer
- Website: [nexus-music.vercel.app](https://nexus-music.vercel.app)
- Email: nexus@electronicmusic.com

---

⭐ **Не забудьте поставить звезду, если проект вам понравился!**
