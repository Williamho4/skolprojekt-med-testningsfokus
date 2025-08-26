import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/home'
import MovieDetails from './pages/movieDetails'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-details/:title" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
