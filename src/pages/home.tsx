import { useState } from 'react'
import { useFetchMovie } from '../hooks/useFetchMovie'
import { Link } from 'react-router-dom'
import '../css/home.css'

function Home() {
  const [search, setSearch] = useState<string | undefined>()
  const { movie, loading, error } = useFetchMovie(search)

  return (
    <main className="home-page">
      <h1>Search for a movie</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div className="movie-card">
          {movie.Poster ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <p>No poster</p>
          )}
          <div>
            <p>{movie.Title}</p>
            <Link to={`/movie-details/${movie.Title}`}>See more</Link>
          </div>
        </div>
      )}
    </main>
  )
}
export default Home
