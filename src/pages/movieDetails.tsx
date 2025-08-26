import { useParams } from 'react-router-dom'
import { useFetchMovie } from '../hooks/useFetchMovie'

function MovieDetails() {
  const { title } = useParams<{ title: string }>()
  const { movie, error, loading } = useFetchMovie(title)

  console.log(movie)

  return (
    <main>
      <h1>{title}</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movie && (
        <div>
          {movie.Poster ? (
            <div>
              <img src={movie.Poster} alt={movie.Title} />
              <p>{movie.Plot}</p>
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
