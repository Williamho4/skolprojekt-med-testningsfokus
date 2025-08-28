import { Link } from 'react-router-dom'
import type { Movie } from '../utils/types'
import styles from '../css/movie-card.module.css'

type MovieCardProps = {
  movie: Pick<Movie, 'Title' | 'Poster'>
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className={styles['movie-card']}>
      {movie.Poster ? (
        <img
          data-id="home-page-movie-img"
          src={movie.Poster}
          alt={movie.Title}
        />
      ) : (
        <p data-id="home-page-no-poster-text">No poster</p>
      )}
      <div>
        <p data-id="home-page-movie-title">{movie.Title}</p>
        <Link data-id="see-more-btn" to={`/movie-details/${movie.Title}`}>
          See more
        </Link>
      </div>
    </div>
  )
}
export default MovieCard
