import { test, expect, Page } from '@playwright/test'

type Movie = {
  Title: string
  Poster?: string
}

async function mockMovieApi(
  page: Page,
  {
    statusCode = 200,
    title,
    poster,
    delayAPI = false,
  }: {
    statusCode?: number
    title?: string
    poster?: string
    delayAPI?: boolean
  }
) {
  await page.route('http://www.omdbapi.com/?i*', async (route) => {
    if (delayAPI === true) {
      await new Promise((r) => setTimeout(r, 1000))
    }

    await route.fulfill({
      status: statusCode,
      contentType: 'application/json',
      body: JSON.stringify({
        Title: title,
        Poster: poster,
      }),
    })
  })
}

async function searchForMovieWithMockData(
  page: Page,
  movie: Movie,
  delayAPI?: boolean
) {
  await mockMovieApi(page, {
    title: movie.Title,
    poster: movie.Poster,
    delayAPI,
  })
  await page.getByTestId('movie-search-input').fill(movie.Title)
}

test.describe('Search for movie', () => {
  const movieWithPoster = {
    Title: 'Cars',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
  }

  const movieWithoutPoster = {
    Title: 'Cars',
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })

  const movies = ['cars', 'f1', 'superman']

  movies.forEach((movie) => {
    test(`search works for ${movie}`, async ({ page }) => {
      await page.getByTestId('movie-search-input').fill(movie)
      await expect(page.getByTestId('home-page-movie-title')).toHaveText(
        new RegExp(movie, 'i')
      )
    })
  })

  test('No movie found error', async ({ page }) => {
    await page.route('http://www.omdbapi.com/?i*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          Response: 'False',
        }),
      })
    })

    await page.getByTestId('movie-search-input').fill('E')

    await expect(page.getByTestId('error-text')).toHaveText('No movie found')
  })

  test('MovieApi error', async ({ page }) => {
    await page.route('http://www.omdbapi.com/?i*', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
      })
    })

    await page.getByTestId('movie-search-input').fill('E')
    await expect(page.getByTestId('error-text')).toHaveText(
      'Something went wrong please try again'
    )
  })

  test('shows movies poster', async ({ page }) => {
    await searchForMovieWithMockData(page, movieWithPoster)
    await expect(page.getByTestId('home-page-movie-img')).toHaveAttribute(
      'src',
      movieWithPoster.Poster
    )
  })

  test('shows no movie poster text', async ({ page }) => {
    await searchForMovieWithMockData(page, movieWithoutPoster)
    await expect(page.getByTestId('home-page-no-poster-text')).toHaveText(
      /No poster/
    )
  })

  test('loading spinner visible', async ({ page }) => {
    await searchForMovieWithMockData(page, movieWithPoster, true)

    await expect(page.getByTestId('loading-spinner')).toBeVisible()
    await expect(page.getByTestId('loading-spinner')).not.toBeVisible()
  })

  test('see more navigates to correct path', async ({ page }) => {
    await searchForMovieWithMockData(page, movieWithoutPoster)

    await page.getByTestId('see-more-btn').click()
    await expect(page).toHaveURL(new RegExp('/movie-details/cars', 'i'))
  })
})
