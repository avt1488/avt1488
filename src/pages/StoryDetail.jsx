import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Clock, Users, Check, ChevronRight, Calendar, Star } from 'lucide-react'
import { STORIES } from '../data/sessions'
import { useBooking } from '../context/BookingContext'

const STEPS = ['Pick a slot', 'Your details', 'Confirm']

export default function StoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const story = STORIES.find(s => s.id === Number(id))
  const { addBooking } = useBooking()

  const [step, setStep] = useState(0) // 0 = detail, 1 = slots, 2 = form, 3 = confirm, 4 = success
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [form, setForm] = useState({ parentName: '', childName: '', childAge: '', email: '', phone: '', note: '' })
  const [errors, setErrors] = useState({})

  if (!story) return <div className="p-20 text-center text-gray-400">Story not found.</div>

  const availableSlots = story.slots.filter(s => s.spots > 0)

  function validate() {
    const e = {}
    if (!form.parentName.trim()) e.parentName = 'Required'
    if (!form.childName.trim()) e.childName = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.childAge) e.childAge = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleConfirm() {
    addBooking(story, selectedSlot, form)
    setStep(4)
  }

  if (step === 4) return <SuccessScreen story={story} slot={selectedSlot} child={form} navigate={navigate} />

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/stories')}
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-800 font-semibold text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {step > 0 ? 'Back' : 'All Stories'}
        </button>

        {/* Progress stepper (visible during booking) */}
        {step > 0 && (
          <div className="flex items-center gap-2 mb-10">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 ${i <= step - 1 ? 'text-purple-700' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                    i < step - 1 ? 'bg-purple-600 border-purple-600 text-white'
                    : i === step - 1 ? 'border-purple-600 text-purple-600 bg-purple-50'
                    : 'border-gray-300 text-gray-400'
                  }`}>
                    {i < step - 1 ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-sm font-semibold hidden sm:inline">{label}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 0: Story overview */}
          {step === 0 && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid md:grid-cols-5 gap-8"
            >
              {/* Left: details */}
              <div className="md:col-span-3">
                <div className={`inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full mb-5 ${story.badge}`}>
                  {story.languageLabel}
                </div>
                <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-1">{story.title}</h1>
                {story.titleZh && <p className="text-xl text-gray-500 mb-5">{story.titleZh}</p>}

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-medium mb-7">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {story.duration} minutes</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> Ages {story.ageRange}</span>
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9 (48 reviews)</span>
                </div>

                <p className="text-gray-600 leading-relaxed text-base mb-8">{story.description}</p>

                <h3 className="font-display text-xl text-gray-800 mb-4">What's included</h3>
                <ul className="space-y-2.5 mb-8">
                  {[
                    ...story.highlights,
                    'Certificate of participation',
                    'Digital photo of your child',
                    'Recommended book list',
                  ].map(h => (
                    <li key={h} className="flex items-center gap-2.5 text-gray-600 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: booking card */}
              <div className="md:col-span-2">
                <div className={`${story.bg} border ${story.border} rounded-3xl p-7 sticky top-24`}>
                  <div className="text-6xl mb-5 text-center">{story.emoji}</div>
                  <div className="text-center mb-6">
                    <div className="font-display text-4xl text-gray-800">S${story.price}</div>
                    <div className="text-sm text-gray-500">per child</div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center justify-between">
                      <span>Duration</span><span className="font-semibold">{story.duration} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Language</span><span className="font-semibold">{story.languageLabel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Age group</span><span className="font-semibold">{story.ageRange} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Available slots</span>
                      <span className={`font-semibold ${availableSlots.length > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {availableSlots.length} slots
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    disabled={availableSlots.length === 0}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3.5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {availableSlots.length > 0 ? 'Book This Story' : 'Fully Booked'}
                  </button>

                  <p className="text-xs text-gray-400 text-center mt-3">Free cancellation up to 24 hours before</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1: Pick a slot */}
          {step === 1 && (
            <motion.div
              key="slots"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="font-display text-3xl text-gray-800 mb-2">Choose a Date & Time</h2>
              <p className="text-gray-500 mb-8">All times are Singapore Standard Time (GMT+8)</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableSlots.map(slot => {
                  const d = slot.datetime
                  const isSelected = selectedSlot?.id === slot.id
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center text-center flex-shrink-0 ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                        <div className="text-xs font-bold leading-none">{d.toLocaleDateString('en-SG', { month: 'short' })}</div>
                        <div className="text-xl font-display leading-none">{d.getDate()}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">
                          {d.toLocaleDateString('en-SG', { weekday: 'long' })}
                        </div>
                        <div className="text-gray-500 text-sm flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {d.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className={`text-xs font-semibold mt-1 ${slot.spots <= 2 ? 'text-orange-500' : 'text-green-600'}`}>
                          {slot.spots} spot{slot.spots !== 1 ? 's' : ''} left
                        </div>
                      </div>
                      {isSelected && (
                        <div className="ml-auto">
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedSlot}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Form */}
          {step === 2 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl"
            >
              <h2 className="font-display text-3xl text-gray-800 mb-2">Tell Us About Your Child</h2>
              <p className="text-gray-500 mb-8">We'll use this to personalise the experience.</p>

              <div className="space-y-5">
                <Field label="Parent / Guardian Name *" error={errors.parentName}>
                  <input
                    value={form.parentName}
                    onChange={e => setForm(f => ({ ...f, parentName: e.target.value }))}
                    placeholder="e.g. Sarah Lim"
                    className={inputCls(errors.parentName)}
                  />
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Child's Name *" error={errors.childName}>
                    <input
                      value={form.childName}
                      onChange={e => setForm(f => ({ ...f, childName: e.target.value }))}
                      placeholder="e.g. Emma"
                      className={inputCls(errors.childName)}
                    />
                  </Field>
                  <Field label="Child's Age *" error={errors.childAge}>
                    <select
                      value={form.childAge}
                      onChange={e => setForm(f => ({ ...f, childAge: e.target.value }))}
                      className={inputCls(errors.childAge)}
                    >
                      <option value="">Select age</option>
                      {Array.from({ length: 10 }, (_, i) => i + 2).map(a => (
                        <option key={a} value={a}>{a} years old</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Email Address *" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="e.g. sarah@email.com"
                    className={inputCls(errors.email)}
                  />
                </Field>
                <Field label="Phone Number (optional)">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="e.g. +65 9123 4567"
                    className={inputCls()}
                  />
                </Field>
                <Field label="Special notes (optional)">
                  <textarea
                    value={form.note}
                    onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                    placeholder="Allergies, special needs, or anything else we should know…"
                    rows={3}
                    className={`${inputCls()} resize-none`}
                  />
                </Field>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => validate() && setStep(3)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold px-8 py-3.5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Review Booking <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && selectedSlot && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-xl"
            >
              <h2 className="font-display text-3xl text-gray-800 mb-2">Confirm Your Booking</h2>
              <p className="text-gray-500 mb-8">Please review the details below before confirming.</p>

              <div className={`${story.bg} border ${story.border} rounded-3xl p-6 mb-6`}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="text-4xl">{story.emoji}</div>
                  <div>
                    <h3 className="font-display text-xl text-gray-800">{story.title}</h3>
                    {story.titleZh && <p className="text-sm text-gray-500">{story.titleZh}</p>}
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  {[
                    ['Date', selectedSlot.datetime.toLocaleDateString('en-SG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })],
                    ['Time', selectedSlot.datetime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' }) + ' SGT'],
                    ['Duration', `${story.duration} minutes`],
                    ['Child', `${form.childName}, age ${form.childAge}`],
                    ['Parent', form.parentName],
                    ['Email', form.email],
                    ['Total', `S$${story.price}`],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-semibold text-gray-800 text-right max-w-[60%]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-6">
                By confirming, you agree to our cancellation policy: free cancellation up to 24 hours before your session. Payment will be collected on arrival.
              </p>

              <button
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-lg"
              >
                Confirm Booking 🎉
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SuccessScreen({ story, slot, child, navigate }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h2 className="font-display text-4xl text-gray-800 mb-3">You're booked!</h2>
        <p className="text-gray-500 text-lg mb-8">
          A confirmation has been sent to <strong>{child.email}</strong>. We can't wait to meet {child.childName}!
        </p>

        <div className={`${story.bg} border ${story.border} rounded-3xl p-6 text-left mb-8`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{story.emoji}</span>
            <div>
              <div className="font-display text-xl text-gray-800">{story.title}</div>
              <div className="text-sm text-gray-500">
                {slot.datetime.toLocaleDateString('en-SG', { weekday: 'short', month: 'short', day: 'numeric' })}
                {' · '}
                {slot.datetime.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit' })} SGT
              </div>
            </div>
          </div>
          <div className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block ${story.badge}`}>
            {story.languageLabel}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/my-bookings')}
            className="flex-1 bg-purple-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-purple-700 transition-colors"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/stories')}
            className="flex-1 bg-white border border-gray-200 text-gray-700 font-bold px-6 py-3 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            Browse More Stories
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function inputCls(error) {
  return `w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
    error
      ? 'border-red-300 focus:ring-red-200'
      : 'border-gray-200 focus:ring-purple-200 focus:border-purple-400'
  }`
}
