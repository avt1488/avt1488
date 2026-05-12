import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import Nav from './components/Nav'
import Home from './pages/Home'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import MyBookings from './pages/MyBookings'

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:id" element={<StoryDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  )
}
