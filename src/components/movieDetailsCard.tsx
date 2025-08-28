import type { Movie } from '../utils/types'
import styles from '../css/movie-details-card.module.css'

type MovieDetailsCardProps = {
  movie: Pick<Movie, 'Title' | 'Poster' | 'Plot' | 'Genre' | 'Year' | 'Runtime'>
}

function MovieDetailsCard({ movie }: MovieDetailsCardProps) {
  return (
    <div className={styles['movie-details']}>
      {movie.Poster ? (
        <img
          data-id="movie-details-poster"
          src={movie.Poster}
          alt={movie.Title}
        />
      ) : (
        <p>No poster</p>
      )}
      <p className={styles['movie-summary']} data-id="movie-details-plot">
        {movie.Plot}
      </p>

      <div className={styles['movie-info']}>
        <h2>Genre</h2>
        <p data-id="movie-details-genre">{movie.Genre}</p>

        <h2>Runtime</h2>
        <p data-id="movie-details-runtime">{movie.Runtime}</p>

        <h2>Release Year</h2>
        <p data-id="movie-details-year">{movie.Year}</p>
      </div>
    </div>
  )
}
export default MovieDetailsCard
