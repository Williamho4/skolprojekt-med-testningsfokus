import { test, expect, Page } from '@playwright/test'

type Movie = {
  Title: string
  Poster?: string
}

async function mockMovieApi(page: Page, title?: string, poster?: string) {
  await page.route('http://www.omdbapi.com/?i*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        Title: title,
        Poster: poster,
      }),
    })
  })
}

async function searchForMovieWithMockData(page: Page, movie: Movie) {
  await mockMovieApi(page, movie.Title, movie.Poster)
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

  test('see more navigates to correct path', async ({ page }) => {
    await searchForMovieWithMockData(page, movieWithoutPoster)

    await page.getByTestId('see-more-btn').click()
    await expect(page).toHaveURL(new RegExp('/movie-details/cars', 'i'))
  })
})
