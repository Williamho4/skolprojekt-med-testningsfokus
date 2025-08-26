import { useState } from 'react'
import { useFetchMovie } from '../hooks/useFetchMovie'
import { Link } from 'react-router-dom'

function Home() {
  const [search, setSearch] = useState<string | undefined>()
  const { movie, loading, error } = useFetchMovie(search)

  return (
    <main>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          {movie.Poster ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <p>No poster</p>
          )}
          <p>{movie.Title}</p>
          <Link to={`/movie-details/${movie.Title}`}>See more</Link>
        </div>
      )}
    </main>
  )
}
export default Home
