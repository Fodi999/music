import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#9d4edd]">
            Обо мне
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30 neon-border">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1604364477640-2866132697ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMHNpbGhvdWV0dGUlMjBuZW9uJTIwbGlnaHRzfGVufDF8fHx8MTc1NjIyNDM3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="NEXUS - Electronic Music Producer"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />
                
                {/* Неоновое свечение вокруг изображения */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/20 via-transparent to-[#ff00ff]/20 animate-pulse-neon" />
              </div>
            </Card>
            
            {/* Анимированные элементы */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-8 h-8 border-2 border-[#00ffff] rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-[#ff00ff] rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed">
                Добро пожаловать в мир электронной музыки будущего. Я создаю звуковые пейзажи, 
                которые переносят слушателей в кибернетические миры и неоновые города.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Мой стиль сочетает в себе элементы синтвейва, эмбиента и фьючер-басса, создавая 
                уникальную атмосферу для погружения в цифровые грёзы.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed">
                За последние годы я выпустил более 50 треков, которые собрали миллионы прослушиваний 
                на стриминговых платформах по всему миру.
              </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#9d4edd]/30">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-b from-[#1a1a1a] to-[#2a1a2a] rounded-lg border border-[#00ffff]/20"
              >
                <div className="text-2xl font-bold text-[#00ffff] neon-glow">50+</div>
                <div className="text-sm text-gray-400">Треков</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-b from-[#1a1a1a] to-[#2a1a2a] rounded-lg border border-[#ff00ff]/20"
              >
                <div className="text-2xl font-bold text-[#ff00ff] neon-glow">5M+</div>
                <div className="text-sm text-gray-400">Прослушиваний</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 bg-gradient-to-b from-[#1a1a1a] to-[#2a1a2a] rounded-lg border border-[#9d4edd]/20"
              >
                <div className="text-2xl font-bold text-[#9d4edd] neon-glow">25+</div>
                <div className="text-sm text-gray-400">Концертов</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}