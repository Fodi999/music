import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar, MapPin, Ticket, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TourDate {
  id: number;
  date: string;
  time: string;
  venue: string;
  city: string;
  country: string;
  ticketsAvailable: boolean;
  soldOut?: boolean;
  image: string;
}

const tourDates: TourDate[] = [
  {
    id: 1,
    date: "15 МАР",
    time: "22:00",
    venue: "TESLA CLUB",
    city: "Москва",
    country: "Россия",
    ticketsAvailable: true,
    image: "https://images.unsplash.com/photo-1573460532456-55c00b654160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzU2MjI0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    date: "22 МАР",
    time: "21:30",
    venue: "AURORA HALL",
    city: "Санкт-Петербург",
    country: "Россия",
    ticketsAvailable: true,
    image: "https://images.unsplash.com/photo-1573460532456-55c00b654160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzU2MjI0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    date: "05 АПР",
    time: "23:00",
    venue: "NEON FESTIVAL",
    city: "Минск",
    country: "Беларусь",
    ticketsAvailable: false,
    soldOut: true,
    image: "https://images.unsplash.com/photo-1573460532456-55c00b654160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzU2MjI0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    date: "18 АПР",
    time: "22:30",
    venue: "CYBER SPACE",
    city: "Киев",
    country: "Украина",
    ticketsAvailable: true,
    image: "https://images.unsplash.com/photo-1573460532456-55c00b654160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzU2MjI0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    date: "02 МАЙ",
    time: "21:00",
    venue: "DIGITAL DREAMS",
    city: "Алматы",
    country: "Казахстан",
    ticketsAvailable: true,
    image: "https://images.unsplash.com/photo-1573460532456-55c00b654160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzU2MjI0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    date: "15 МАЙ",
    time: "20:00",
    venue: "ELECTRONIC FESTIVAL",
    city: "Ереван",
    country: "Армения",
    ticketsAvailable: true,
    image: "https://images.unsplash.com/photo-1573460532456-55c00b654160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzU2MjI0Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
];

export function ToursSection() {
  return (
    <section id="tours" className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1a] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#9d4edd]">
            Тур 2024
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#ff00ff] to-[#9d4edd] mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Живые выступления в самых крутых клубах и фестивалях. Погрузись в мир электронной музыки вместе со мной
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tourDates.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20 hover:border-[#ff00ff]/50 transition-all duration-300 h-full">
                <div className="flex">
                  {/* Изображение места проведения */}
                  <div className="relative w-32 md:w-40 flex-shrink-0">
                    <ImageWithFallback
                      src={tour.image}
                      alt={tour.venue}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a1a]/80" />
                    
                    {/* Индикатор sold out */}
                    {tour.soldOut && (
                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold transform -rotate-12">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="flex-1 p-6">
                    <div className="flex items-start justify-between h-full">
                      <div className="space-y-3 flex-1">
                        {/* Дата */}
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] p-3 rounded-lg">
                            <div className="text-black">
                              <Calendar size={20} />
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#00ffff] neon-glow">
                              {tour.date}
                            </div>
                            <div className="text-sm text-gray-400">{tour.time}</div>
                          </div>
                        </div>

                        {/* Место */}
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-[#ff00ff] transition-colors">
                            {tour.venue}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-400">
                            <div className="w-4 h-4">
                              <MapPin size={16} />
                            </div>
                            <span>{tour.city}, {tour.country}</span>
                          </div>
                        </div>

                        {/* Статус билетов */}
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 text-[#9d4edd]">
                            <Ticket size={16} />
                          </div>
                          <span className={`text-sm ${
                            tour.soldOut ? 'text-red-400' : 
                            tour.ticketsAvailable ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            {tour.soldOut ? 'Билеты распроданы' : 
                             tour.ticketsAvailable ? 'Билеты в продаже' : 'Скоро в продаже'}
                          </span>
                        </div>
                      </div>

                      {/* Кнопка покупки */}
                      <div className="ml-4">
                        <Button
                          disabled={tour.soldOut || !tour.ticketsAvailable}
                          className={`px-6 py-3 ${
                            tour.soldOut || !tour.ticketsAvailable
                              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-[#ff00ff] to-[#9d4edd] text-white neon-border hover:shadow-[0_0_20px_#ff00ff] transition-all duration-300'
                          }`}
                        >
                          {tour.soldOut ? 'Sold Out' : 
                           tour.ticketsAvailable ? (
                             <>
                               <div className="w-4 h-4 mr-2">
                                 <ExternalLink size={16} />
                               </div>
                               Билеты
                             </>
                           ) : 'Скоро'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Уведомления о новых концертах */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-[#1a1a1a] to-[#2a1a2a] border-[#00ffff]/30 p-8">
            <h3 className="text-2xl font-bold text-[#00ffff] mb-4 neon-glow">
              Не пропусти новые концерты!
            </h3>
            <p className="text-gray-300 mb-6">
              Подпишись на уведомления и узнавай первым о новых датах туров и специальных мероприятиях
            </p>
            <Button className="bg-gradient-to-r from-[#00ffff] to-[#9d4edd] text-black px-8 py-3 neon-border hover:shadow-[0_0_30px_#00ffff] transition-all duration-300">
              Подписаться на обновления
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}