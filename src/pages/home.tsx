import { useState } from 'react'
import { useFetchMovie } from '../hooks/useFetchMovie'
import { Link } from 'react-router-dom'
import '../css/home.css'

function Home() {
  const [search, setSearch] = useState<string | undefined>()
  const { movie, loading, error } = useFetchMovie(search)

  console.log(movie)

  return (
    <main className="home-page">
      <h1>Search for a movie</h1>
      <input
        data-id="movie-search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p data-id="home-page-loading-spinner">Loading...</p>}
      {error && <p data-id="home-page-error">{error}</p>}
      {movie && (
        <div className="movie-card">
          {movie.Poster ? (
            <img
              data-id="home-page-movie-img"
              src={movie.Poster}
              alt={movie.Title}
            />
          ) : (
            <p>No poster</p>
          )}
          <div>
            <p data-id="home-page-movie-title">{movie.Title}</p>
            <Link data-id="see-more-btn" to={`/movie-details/${movie.Title}`}>
              See more
            </Link>
          </div>
        </div>
      )}
    </main>
  )
}
export default Home
