import { useState } from 'react'
import { useFetchMovie } from '../hooks/useFetchMovie'
import styles from '../css/home.module.css'
import MovieCard from '../components/movieCard'
import ErrorText from '../components/errorText'
import LoadingText from '../components/loadingText'
import Input from '../components/Input/input'

function Home() {
  const [search, setSearch] = useState<string | undefined>()
  const { movie, loading, error } = useFetchMovie(search)

  return (
    <main className={styles['home-page']}>
      <h1>Search for a movie</h1>
      <Input
        placeholder="Movie Title"
        data-id="movie-search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <LoadingText />}
      {error && <ErrorText error={error} />}
      {movie && <MovieCard movie={movie} />}
    </main>
  )
}
export default Home
