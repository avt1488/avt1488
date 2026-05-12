import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen, CheckCircle } from 'lucide-react'
import { useBooking } from '../context/BookingContext'

export default function MyBookings() {
  const { bookings } = useBooking()

  if (bookings.length === 0) return <EmptyState />

  const upcoming = bookings.filter(b => b.slot.datetime > new Date())
  const past = bookings.filter(b => b.slot.datetime <= new Date())

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 py-14">
        <div className="max-w-5xl mx-auto px-6 text-white">
          <h1 className="font-display text-5xl mb-2">My Bookings</h1>
          <p className="text-white/80 text-lg">
            {bookings.length} session{bookings.length !== 1 ? 's' : ''} booked · your story adventures
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Summary cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Total Bookings', value: bookings.length, emoji: '📚', color: 'from-purple-500 to-pink-500' },
            { label: 'Upcoming', value: upcoming.length, emoji: '📅', color: 'from-sky-500 to-teal-500' },
            { label: 'Completed', value: past.length, emoji: '⭐', color: 'from-orange-400 to-yellow-400' },
          ].map(({ label, value, emoji, color }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gradient-to-br ${color} rounded-2xl p-5 text-white`}
            >
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="font-display text-4xl">{value}</div>
              <div className="text-white/80 text-sm font-medium">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-12">
            <h2 className="font-display text-2xl text-gray-800 mb-5 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-purple-500" /> Upcoming Sessions
            </h2>
            <div className="space-y-4">
              {upcoming.map((b, i) => <BookingCard key={b.id} booking={b} index={i} />)}
            </div>
          </section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section>
            <h2 className="font-display text-2xl text-gray-800 mb-5 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" /> Past Sessions
            </h2>
            <div className="space-y-4">
              {past.map((b, i) => <BookingCard key={b.id} booking={b} index={i} past />)}
            </div>
          </section>
        )}

        {/* Explore more CTA */}
        <div className="mt-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-8 text-white text-center">
          <div className="text-5xl mb-4">🌟</div>
          <h3 className="font-display text-3xl mb-2">Ready for Another Adventure?</h3>
          <p className="text-white/80 mb-6">Browse our full story collection and book your next session.</p>
          <Link
            to="/stories"
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-7 py-3 rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Explore Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function BookingCard({ booking, index, past = false }) {
  const { story, slot, child } = booking
  const d = slot.datetime

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`flex flex-col sm:flex-row gap-5 ${story.bg} border ${story.border} rounded-3xl p-5 ${past ? 'opacity-70' : ''}`}
    >
      {/* Emoji + date column */}
      <div className="flex sm:flex-col items-center gap-4 sm:gap-2 sm:min-w-[80px]">
        <div className="text-5xl">{story.emoji}</div>
        <div className={`text-center rounded-xl px-3 py-2 ${past ? 'bg-gray-200 text-gray-500' : 'bg-white/70'}`}>
          <div className="text-xs font-bold text-gray-500 uppercase leading-none">
            {d.toLocaleDateString('en-SG', { month: 'short' })}
          </div>
          <div className="font-display text-2xl text-gray-800 leading-none">{d.getDate()}</div>
        </div>
      </div>

      {/* Main info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="font-display text-xl text-gray-800">{story.title}</h3>
            {story.titleZh && <p className="text-sm text-gray-500">{story.titleZh}</p>}
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${past ? 'bg-gray-200 text-gray-500' : story.badge}`}>
            {past ? 'Completed' : 'Confirmed'}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {d.toLocaleDateString('en-SG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {d.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })} SGT
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {story.languageLabel}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-gray-600">Child: <strong>{child.childName}</strong>, age {child.childAge}</span>
          <span className="text-gray-600">Parent: <strong>{child.parentName}</strong></span>
        </div>
      </div>

      {/* Price */}
      <div className="sm:text-right">
        <div className="font-display text-2xl text-gray-800">S${story.price}</div>
        <div className="text-xs text-gray-400">{story.duration} min</div>
        {past && (
          <div className="mt-2 inline-flex items-center gap-1 text-xs text-yellow-600 font-semibold bg-yellow-100 px-2.5 py-1 rounded-full">
            ⭐ Leave a review
          </div>
        )}
      </div>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm"
      >
        <div className="text-8xl mb-6">📖</div>
        <h2 className="font-display text-4xl text-gray-800 mb-3">No bookings yet</h2>
        <p className="text-gray-500 text-lg mb-8">
          Your story adventures are waiting! Browse our sessions and book your first one.
        </p>
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-7 py-3.5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Browse Stories <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  )
}
