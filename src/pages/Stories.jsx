import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, Clock, Users } from 'lucide-react'
import { STORIES } from '../data/sessions'

const LANG_FILTERS = [
  { value: 'all', label: 'All Stories' },
  { value: 'zh', label: '中文 Chinese' },
  { value: 'en', label: 'English' },
  { value: 'bilingual', label: 'Bilingual 双语' },
]

const AGE_FILTERS = [
  { value: 'all', label: 'All Ages' },
  { value: '3-5', label: 'Age 3–5' },
  { value: '5-8', label: 'Age 5–8' },
]

export default function Stories() {
  const [lang, setLang] = useState('all')
  const [age, setAge] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = STORIES.filter(s => {
    if (lang !== 'all' && s.language !== lang) return false
    if (age !== 'all') {
      const [minA, maxA] = age.split('-').map(Number)
      const [sMin, sMax] = s.ageRange.split('–').map(Number)
      if (sMax < minA || sMin > maxA) return false
    }
    if (query) {
      const q = query.toLowerCase()
      if (!s.title.toLowerCase().includes(q) && !(s.titleZh || '').includes(q) && !s.description.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 py-14">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="font-display text-5xl mb-3">Our Story Collection</h1>
          <p className="text-white/85 text-lg max-w-xl mx-auto">
            Handcrafted tales in Chinese, English, and bilingual — for every curious little mind.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stories…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 text-sm"
            />
          </div>

          {/* Language pills */}
          <div className="flex flex-wrap gap-2">
            {LANG_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setLang(f.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  lang === f.value
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Age pills */}
          <div className="flex flex-wrap gap-2">
            {AGE_FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setAge(f.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  age === f.value
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No stories match your filters.</p>
            <button
              onClick={() => { setLang('all'); setAge('all'); setQuery('') }}
              className="mt-4 text-purple-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {filtered.map((story, i) => (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <StoryCard story={story} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

function StoryCard({ story }) {
  const nextSlot = story.slots.find(s => s.spots > 0)

  return (
    <Link
      to={`/stories/${story.id}`}
      className={`flex flex-col h-full ${story.bg} border ${story.border} rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{story.emoji}</div>
        <div className={`text-xs font-bold px-2.5 py-1 rounded-full ${story.badge}`}>
          {story.languageLabel}
        </div>
      </div>

      <h3 className="font-display text-xl text-gray-800 mb-0.5">{story.title}</h3>
      {story.titleZh && <p className="text-sm text-gray-500 mb-2">{story.titleZh}</p>}

      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
        {story.description}
      </p>

      {/* Highlights */}
      <div className="flex flex-wrap gap-2 mb-5">
        {story.highlights.map(h => (
          <span key={h} className="text-xs bg-white/70 border border-white rounded-full px-2.5 py-0.5 text-gray-600 font-medium">
            {h}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> {story.duration} min
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" /> Age {story.ageRange}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/60">
        <div>
          <span className="font-display text-2xl text-gray-800">S${story.price}</span>
          <span className="text-xs text-gray-400"> /child</span>
          {nextSlot && (
            <p className="text-xs text-green-600 font-medium mt-0.5">
              Next: {nextSlot.datetime.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })}
            </p>
          )}
        </div>
        <span className="inline-flex items-center gap-1 bg-purple-600 text-white font-bold text-sm px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors">
          Book <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  )
}
