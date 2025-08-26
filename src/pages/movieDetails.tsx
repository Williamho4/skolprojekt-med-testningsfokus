import { useParams } from 'react-router-dom'
import { useFetchMovie } from '../hooks/useFetchMovie'

function MovieDetails() {
  const { title } = useParams<{ title: string }>()
  const { movie, error, loading } = useFetchMovie(title)

  console.log(movie)

  return (
    <main className="movie-detail-page">
      <h1 data-id="movie-detail-title">{title}</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          {movie.Poster ? (
            <div className="movie-details">
              <img
                data-id="movie-details-poster"
                src={movie.Poster}
                alt={movie.Title}
              />
              <p className="movie-summary">{movie.Plot}</p>

              <div className="movie-info">
                <h2>Genre</h2>
                <p data-id="movie-details-genre">{movie.Genre}</p>

                <h2>Runtime</h2>
                <p data-id="movie-details-runtime">{movie.Runtime}</p>

                <h2>Release Year</h2>
                <p data-id="movie-details-year">{movie.Year}</p>
              </div>
            </div>
          ) : (
            <p>No poster</p>
          )}
        </div>
      )}
    </main>
  )
}
export default MovieDetails
