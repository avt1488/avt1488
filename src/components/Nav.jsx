import { Link, useLocation } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { BookOpen, CalendarCheck, Home, Sparkles } from 'lucide-react'

export default function Nav() {
  const { pathname } = useLocation()
  const { bookings } = useBooking()

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/stories', label: 'Stories', icon: BookOpen },
    { to: '/my-bookings', label: 'My Bookings', icon: CalendarCheck, badge: bookings.length },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl text-purple-700 leading-none">
            StoryTime<span className="text-pink-500">SG</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon, badge }) => {
            const active = pathname === to || (to !== '/' && pathname.startsWith(to))
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
                {badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                    {badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
