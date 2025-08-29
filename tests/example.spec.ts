import { test, expect, Page } from '@playwright/test'

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

test.describe('Search for movie', () => {
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
    const movie = {
      Title: 'Cars',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
    }

    await mockMovieApi(page, movie.Title, movie.Poster)

    await page.getByTestId('movie-search-input').fill('cars')
    await expect(page.getByTestId('home-page-movie-img')).toHaveAttribute(
      'src',
      movie.Poster
    )
  })

  test('shows no movie poster text', async ({ page }) => {
    const movie = {
      Title: 'Cars',
    }

    await mockMovieApi(page, movie.Title)

    await page.getByTestId('movie-search-input').fill('cars')
    await expect(page.getByTestId('home-page-no-poster-text')).toHaveText(
      /No poster/
    )
  })
})
