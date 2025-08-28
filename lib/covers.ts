// Рабочие изображения для обложек альбомов
export const DEFAULT_COVERS = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
  "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300"
];

// Получить случайную обложку (только для клиента)
export const getRandomCover = () => {
  // Используем timestamp для псевдослучайности, которая будет одинаковой на сервере и клиенте
  const index = Date.now() % DEFAULT_COVERS.length;
  return DEFAULT_COVERS[index];
};

// Получить обложку по индексу
export const getCoverByIndex = (index: number) => {
  return DEFAULT_COVERS[index % DEFAULT_COVERS.length];
};
