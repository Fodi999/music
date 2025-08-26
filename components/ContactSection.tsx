import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Instagram, Music, Play, Youtube, Mail, Send } from 'lucide-react';

const socialLinks = [
  {
    name: 'Spotify',
    icon: Play,
    url: '#',
    followers: '1.2M',
    color: 'text-green-400',
    hoverColor: 'hover:text-green-400'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: '#',
    followers: '850K',
    color: 'text-pink-400',
    hoverColor: 'hover:text-pink-400'
  },
  {
    name: 'SoundCloud',
    icon: Music,
    url: '#',
    followers: '2.1M',
    color: 'text-orange-400',
    hoverColor: 'hover:text-orange-400'
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: '#',
    followers: '650K',
    color: 'text-red-400',
    hoverColor: 'hover:text-red-400'
  }
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Здесь будет логика отправки формы
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
            Контакты
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Свяжись со мной для сотрудничества, букинга или просто чтобы поделиться впечатлениями о музыке
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Форма обратной связи */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30 p-8">
              <h3 className="text-2xl font-bold text-[#00ffff] mb-6 neon-glow">
                Напиши мне
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300">Имя</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-[#9d4edd]/30 text-white placeholder-gray-500 focus:border-[#00ffff] focus:ring-[#00ffff]/20 transition-all duration-300"
                    placeholder="Твоё имя"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#0a0a0a] border-[#9d4edd]/30 text-white placeholder-gray-500 focus:border-[#00ffff] focus:ring-[#00ffff]/20 transition-all duration-300"
                    placeholder="твой@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300">Сообщение</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#0a0a0a] border-[#9d4edd]/30 text-white placeholder-gray-500 focus:border-[#00ffff] focus:ring-[#00ffff]/20 transition-all duration-300 resize-none"
                    placeholder="Расскажи, что у тебя на уме..."
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black py-4 text-lg neon-border hover:shadow-[0_0_30px_#00ffff] transition-all duration-300"
                  >
                    <div className="w-5 h-5 mr-2">
                      <Send size={20} />
                    </div>
                    Отправить сообщение
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Социальные сети и контактная информация */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Социальные сети */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30 p-8">
              <h3 className="text-2xl font-bold text-[#ff00ff] mb-6 neon-glow">
                Социальные сети
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`block p-4 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-lg border border-gray-700 hover:border-current ${social.hoverColor} transition-all duration-300 group`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform`}>
                          <IconComponent size={24} />
                        </div>
                        <span className="font-medium text-white">{social.name}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {social.followers} подписчиков
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </Card>

            {/* Прямые контакты */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30 p-8">
              <h3 className="text-2xl font-bold text-[#9d4edd] mb-6 neon-glow">
                Прямые контакты
              </h3>
              
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] rounded-lg border border-gray-700 hover:border-[#00ffff]/50 transition-all duration-300"
                >
                  <div className="w-6 h-6 text-[#00ffff]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-white">Booking & Collaborations</div>
                    <div className="text-sm text-gray-400">nexus@electronicmusic.com</div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] rounded-lg border border-gray-700 hover:border-[#ff00ff]/50 transition-all duration-300"
                >
                  <div className="w-6 h-6 text-[#ff00ff]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-white">Press & Media</div>
                    <div className="text-sm text-gray-400">press@nexusmusic.com</div>
                  </div>
                </motion.div>
              </div>
            </Card>

            {/* Время отклика */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#9d4edd]/20 to-[#ff006e]/20 border border-[#9d4edd]/30 rounded-lg p-6 text-center"
            >
              <h4 className="text-lg font-bold text-[#9d4edd] mb-2">⚡ Быстрый ответ</h4>
              <p className="text-gray-300 text-sm">
                Обычно отвечаю в течение 24 часов. Для срочных вопросов пишите в Direct Instagram
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}