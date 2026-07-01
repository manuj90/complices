import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AboutPage } from '@/pages/AboutPage'
import { HomePage } from '@/pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/acerca" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}