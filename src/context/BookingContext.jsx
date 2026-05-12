import { createContext, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([])
  const [cart, setCart] = useState(null) // { story, slot }

  function addBooking(story, slot, child) {
    setBookings(prev => [
      ...prev,
      {
        id: Date.now(),
        story,
        slot,
        child,
        status: 'confirmed',
        bookedAt: new Date(),
      },
    ])
  }

  return (
    <BookingContext.Provider value={{ bookings, cart, setCart, addBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
