import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Globe, Award } from 'lucide-react'
import { STORIES } from '../data/sessions'

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

export default function Home() {
  const featured = STORIES.slice(0, 3)

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-8%] left-[-5%] w-96 h-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* floating emoji shapes */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 right-[8%] text-7xl select-none"
        >
          📖
        </motion.div>
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-20 left-[6%] text-6xl select-none"
        >
          🌟
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-32 left-[18%] text-5xl select-none"
        >
          🐉
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-28 right-[20%] text-5xl select-none hidden md:block"
        >
          🎭
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              Loved by 500+ families in Singapore
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-6">
              Where Little
              <br />
              <span className="text-yellow-300">Imaginations</span>
              <br />
              Come Alive
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Live storytelling sessions in <strong>Chinese</strong> and <strong>English</strong> for
              children aged 3–9. Book a session and let the adventure begin!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/stories"
                className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-7 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base"
              >
                Browse Sessions
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/my-bookings"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-bold px-7 py-3.5 rounded-2xl border border-white/40 hover:bg-white/30 transition-all text-base"
              >
                My Bookings
              </Link>
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 border border-white/30 text-white">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, num: '500+', label: 'Happy Families' },
                  { icon: Globe, num: '2', label: 'Languages' },
                  { icon: Award, num: '6+', label: 'Story Titles' },
                  { icon: Star, num: '4.9', label: 'Avg. Rating' },
                ].map(({ icon: Icon, num, label }) => (
                  <div key={label} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="font-display text-4xl text-yellow-300">{num}</div>
                    <div className="text-sm text-white/80 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl text-gray-800 mb-3">How It Works</h2>
            <p className="text-gray-500 text-lg">Three easy steps to a magical story experience</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                emoji: '🔍',
                title: 'Choose Your Story',
                desc: 'Browse our collection of Chinese, English, and bilingual sessions. Filter by age group and language.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                step: '02',
                emoji: '📅',
                title: 'Pick a Time Slot',
                desc: 'Select a date and time that suits your family. Morning and afternoon sessions available.',
                color: 'from-pink-500 to-orange-400',
              },
              {
                step: '03',
                emoji: '✨',
                title: 'Enjoy the Magic',
                desc: "Show up and let our storyteller do the rest. Your child will be captivated from start to finish!",
                color: 'from-orange-400 to-yellow-400',
              },
            ].map(({ step, emoji, title, desc, color }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-5 shadow-md`}
                >
                  {emoji}
                </div>
                <div className="absolute top-6 right-6 font-display text-5xl text-gray-100 select-none">
                  {step}
                </div>
                <h3 className="font-display text-xl text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="font-display text-4xl text-gray-800 mb-2">Featured Stories</h2>
              <p className="text-gray-500 text-lg">Most loved by our little readers</p>
            </div>
            <Link
              to="/stories"
              className="hidden sm:inline-flex items-center gap-1.5 text-purple-600 font-bold hover:text-purple-800 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((story, i) => (
              <motion.div
                key={story.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <StoryCard story={story} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 bg-purple-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-purple-700 transition-colors"
            >
              View all stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-4xl text-gray-800 mb-3">What Parents Say</h2>
            <p className="text-gray-500 text-lg">Real stories from real families</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-5 text-sm">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.child}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-500">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <div className="text-5xl mb-5">🎉</div>
          <h2 className="font-display text-4xl text-white mb-4">
            Ready for a Story Adventure?
          </h2>
          <p className="text-white/85 text-lg mb-8">
            First session 20% off for new families. Use code{' '}
            <span className="bg-white/20 rounded-lg px-2 py-0.5 font-mono font-bold">
              STORY20
            </span>{' '}
            at checkout.
          </p>
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-base"
          >
            Book Your First Session <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
        <div className="font-display text-lg text-white mb-2">
          StoryTime<span className="text-pink-400">SG</span>
        </div>
        <p>Chinese & English storytelling for children · Singapore</p>
        <p className="mt-2 text-gray-600">© 2026 StoryTimeSG · hello@storytimesg.com</p>
      </footer>
    </div>
  )
}

function StoryCard({ story }) {
  return (
    <Link
      to={`/stories/${story.id}`}
      className={`block ${story.bg} rounded-3xl border ${story.border} p-6 hover:shadow-xl hover:-translate-y-1 transition-all h-full`}
    >
      <div className="text-5xl mb-4">{story.emoji}</div>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${story.badge}`}>
          {story.languageLabel}
        </span>
        <span className="text-xs text-gray-500 font-medium">Age {story.ageRange}</span>
        <span className="text-xs text-gray-500 font-medium">{story.duration} min</span>
      </div>
      <h3 className="font-display text-xl text-gray-800 mb-1">{story.title}</h3>
      {story.titleZh && (
        <p className="text-sm text-gray-500 mb-2">{story.titleZh}</p>
      )}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
        {story.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl text-gray-800">
          S${story.price}
          <span className="text-sm font-body text-gray-400"> /child</span>
        </span>
        <span className="inline-flex items-center gap-1 text-purple-600 font-bold text-sm">
          Book now <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

const TESTIMONIALS = [
  {
    name: 'Sarah Lim',
    child: 'Mum of Emma, age 5',
    text: 'Emma couldn\'t stop talking about the jade dragon for days! The storyteller made the Chinese characters come alive in the most magical way.',
  },
  {
    name: 'Wei Ming Tan',
    child: 'Dad of Lucas, age 7',
    text: 'As a bilingual family, we\'ve struggled to keep Chinese fun. This storytelling session changed everything — Lucas is now asking for more!',
  },
  {
    name: 'Priya Nair',
    child: 'Mum of Arjun & Meera',
    text: 'Both my kids (ages 4 and 6) sat completely still for the whole session. The storyteller\'s energy and props are just incredible.',
  },
]
