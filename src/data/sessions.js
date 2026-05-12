export const STORIES = [
  {
    id: 1,
    title: 'The Jade Dragon',
    titleZh: '玉龙传说',
    language: 'zh',
    languageLabel: 'Chinese 中文',
    ageRange: '4–7',
    duration: 45,
    price: 28,
    emoji: '🐉',
    color: 'from-red-400 to-orange-400',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    description:
      'Journey through ancient China with a legendary jade dragon. Children discover courage, friendship, and the magic of the Lunar New Year.',
    highlights: ['Mandarin vocabulary', 'Cultural traditions', 'Interactive props'],
    slots: generateSlots(1),
  },
  {
    id: 2,
    title: 'The Moonlight Rabbit',
    titleZh: '月亮兔',
    language: 'zh',
    languageLabel: 'Chinese 中文',
    ageRange: '3–6',
    duration: 30,
    price: 22,
    emoji: '🐰',
    color: 'from-purple-400 to-pink-400',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    badge: 'bg-purple-100 text-purple-700',
    description:
      'A gentle bedtime tale about the rabbit on the moon who makes special moon cakes for children who dream big.',
    highlights: ['Mid-Autumn Festival', 'Nursery rhymes', 'Felt puppets'],
    slots: generateSlots(2),
  },
  {
    id: 3,
    title: 'The Enchanted Library',
    language: 'en',
    languageLabel: 'English',
    ageRange: '5–8',
    duration: 45,
    price: 28,
    emoji: '📚',
    color: 'from-sky-400 to-teal-400',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    badge: 'bg-sky-100 text-sky-700',
    description:
      'A young girl discovers a library where every book whisks her into a different adventure. Perfect for budding readers.',
    highlights: ['Phonics fun', 'Character voices', 'Story maps'],
    slots: generateSlots(3),
  },
  {
    id: 4,
    title: 'Bramble & the Brave Bees',
    language: 'en',
    languageLabel: 'English',
    ageRange: '3–5',
    duration: 30,
    price: 22,
    emoji: '🐝',
    color: 'from-yellow-400 to-amber-400',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-100 text-yellow-700',
    description:
      'Bramble the bear and his buzzy friends learn that teamwork makes every honey jar sweeter. Packed with songs and movement.',
    highlights: ['Songs & movement', 'Nature themes', 'Plush puppets'],
    slots: generateSlots(4),
  },
  {
    id: 5,
    title: 'Five Little Tigers',
    titleZh: '五只小老虎',
    language: 'bilingual',
    languageLabel: 'Bilingual 双语',
    ageRange: '3–7',
    duration: 60,
    price: 38,
    emoji: '🐯',
    color: 'from-orange-400 to-pink-500',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    description:
      'Our flagship bilingual session weaves Chinese and English together seamlessly — ideal for multilingual families.',
    highlights: ['Chinese + English', 'Count & rhyme', 'Certificate of bravery'],
    slots: generateSlots(5),
  },
  {
    id: 6,
    title: 'Dragon Boat Adventure',
    titleZh: '龙舟历险记',
    language: 'bilingual',
    languageLabel: 'Bilingual 双语',
    ageRange: '5–9',
    duration: 60,
    price: 38,
    emoji: '🚣',
    color: 'from-teal-400 to-cyan-500',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700',
    description:
      'Paddle through the Dragon Boat Festival story in both languages, with drums, craft-making, and cultural discovery.',
    highlights: ['Dragon Boat culture', 'Craft activity', 'Bilingual narration'],
    slots: generateSlots(6),
  },
]

function generateSlots(seed) {
  const base = new Date('2026-05-15')
  const slots = []
  for (let i = 0; i < 12; i++) {
    const d = new Date(base)
    d.setDate(d.getDate() + ((seed * 3 + i * 2) % 30))
    const hours = [9, 10, 11, 14, 15, 16]
    const h = hours[(seed + i) % hours.length]
    d.setHours(h, 0, 0, 0)
    slots.push({
      id: `${seed}-${i}`,
      datetime: new Date(d),
      spots: Math.max(1, ((seed * 7 + i * 3) % 6) + 1),
    })
  }
  return slots.sort((a, b) => a.datetime - b.datetime)
}
