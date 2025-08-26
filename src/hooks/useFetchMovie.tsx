import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

export function useFetchMovie(search: string | undefined) {
  const [movie, setMovie] = useState<any>(null)
  const [debouncedSearch] = useDebounce(search, 1000)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!debouncedSearch) {
      setMovie(null)
      return
    }

    async function fetchMovie() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=d7524ae9&t=${debouncedSearch}`
        )

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }

        const result = await response.json()

        if (result.Response === 'False') {
          throw new Error('No movie found')
        }

        setMovie(result)
      } catch (err: any) {
        setError(err.message)
        setMovie(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [debouncedSearch])

  return { movie, loading, error }
}
