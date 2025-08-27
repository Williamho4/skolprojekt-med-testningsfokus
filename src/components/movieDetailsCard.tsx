import type { Movie } from '../utils/types'
import styles from '../css/movie-details-card.module.css'

type MovieDetailsCardProps = {
  movie: Movie
}

function MovieDetailsCard({ movie }: MovieDetailsCardProps) {
  return (
    <div>
      {movie.Poster ? (
        <div className={styles['movie-details']}>
          <img
            data-id="movie-details-poster"
            src={movie.Poster}
            alt={movie.Title}
          />
          <p className={styles['movie-summary']}>{movie.Plot}</p>

          <div className={styles['movie-info']}>
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
  )
}
export default MovieDetailsCard
