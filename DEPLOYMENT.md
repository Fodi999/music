# NEXUS Music - Deployment Guide

## Деплой на Vercel

### 1. Подготовка проекта

Убедитесь, что все зависимости установлены:
```bash
npm install
```

### 2. Проверка сборки

Проверьте, что проект собирается без ошибок:
```bash
npm run build
```

### 3. Деплой на Vercel

#### Автоматический деплой (рекомендуется)

1. Подключите GitHub репозиторий к Vercel
2. Настройте переменные окружения в панели Vercel
3. Vercel автоматически будет деплоить при каждом пуше в main ветку

#### Ручной деплой

1. Установите Vercel CLI:
```bash
npm i -g vercel
```

2. Войдите в аккаунт:
```bash
vercel login
```

3. Деплой проекта:
```bash
vercel --prod
```

### 4. Переменные окружения

Добавьте следующие переменные в панели Vercel:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=NEXUS Music
NEXT_PUBLIC_SITE_DESCRIPTION=Electronic Music Producer - Creating the Future of Sound
```

### 5. Настройки домена

1. В панели Vercel перейдите в Settings → Domains
2. Добавьте свой кастомный домен
3. Настройте DNS записи согласно инструкциям Vercel

### 6. Оптимизация производительности

- ✅ Next.js Image Optimization включена
- ✅ Automatic Static Optimization
- ✅ Tree Shaking для уменьшения размера бандла
- ✅ Gzip сжатие
- ✅ CDN для статических ресурсов

### 7. Мониторинг

Используйте Vercel Analytics для мониторинга:
- Core Web Vitals
- Real User Monitoring
- Error tracking

### 8. Troubleshooting

#### Если сборка падает:

1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все зависимости в package.json
3. Проверьте TypeScript ошибки локально: `npm run build`

#### Если API не работает:

1. Убедитесь, что все переменные окружения установлены
2. Проверьте CORS настройки в vercel.json
3. Убедитесь, что MusicBrainz API доступен

### 9. Полезные команды

```bash
# Локальная разработка
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен сборки локально
npm start

# Проверка кода
npm run lint

# Деплой на Vercel
vercel --prod
```

### 10. Структура проекта для деплоя

```
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles
│   ├── music/          # Music player page
│   ├── playlist/       # Playlist page
│   └── search/         # Music search page
├── components/         # React components
├── lib/               # Utilities and API
├── hooks/             # Custom React hooks
├── public/            # Static assets
├── styles/            # Styles
├── next.config.js     # Next.js config
├── vercel.json        # Vercel config
└── package.json       # Dependencies
```

## Успешный деплой! 🚀

После деплоя ваш сайт будет доступен по URL, который предоставит Vercel.
