import { useParams } from 'react-router-dom'
import { useFetchMovie } from '../hooks/useFetchMovie'
import MovieDetailsCard from '../components/movieDetailsCard'
import styles from '../css/movie-details-page.module.css'
import ErrorText from '../components/errorText'
import LoadingText from '../components/loadingText'

function MovieDetails() {
  const { title } = useParams<{ title: string }>()
  const { movie, error, loading } = useFetchMovie(title)

  return (
    <main className={styles['movie-detail-page']}>
      <h1 data-id="movie-detail-title">{title}</h1>

      {loading && <LoadingText />}
      {error && <ErrorText error={error} />}
      {movie && <MovieDetailsCard movie={movie} />}
    </main>
  )
}
export default MovieDetails
