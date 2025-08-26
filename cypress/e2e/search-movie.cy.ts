Cypress.Commands.add(
  'mockMovie',
  (title, posterUrl, genre, runtime, releaseYear) => {
    cy.intercept('GET', 'http://www.omdbapi.com/**', {
      statusCode: 200,
      body: {
        Title: title,
        Poster: posterUrl,
        Genre: genre,
        Runtime: runtime,
        Year: releaseYear,
        Response: 'True',
      },
    }).as(`mockedMovie-${title}`)
  }
)

describe('search for movie', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const movies = ['cars', 'f1', 'superman']

  movies.forEach((title) => {
    it(`search works for ${title}`, () => {
      cy.get('[data-id="movie-search-input"]').type(title)
      cy.get('[data-id="home-page-movie-title"]').contains(
        new RegExp(title, 'i')
      )
    })
  })

  it('mocks API response', () => {
    const movieName = 'cars'

    cy.mockMovie(
      movieName,
      'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg'
    )

    cy.get('[data-id="movie-search-input"]').type(movieName)
    cy.wait(`@mockedMovie-${movieName}`)

    cy.get('[data-id="home-page-movie-title"]').contains(
      new RegExp(movieName, 'i')
    )
    cy.get('[data-id="home-page-movie-img"]').should(
      'have.attr',
      'src',
      'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg'
    )
  })

  it('shows loading spinner', () => {
    cy.get('[data-id="movie-search-input"]').type('cars')
    cy.get('[data-id="home-page-loading-spinner"]').should('exist')
    cy.get('[data-id="home-page-movie-title"]').contains(/cars/i)
  })

  it.only('see more works', () => {
    const movieName = 'f1'
    const genre = 'race'
    const runtime = '1 hour'
    const year = '2025'

    cy.mockMovie(
      movieName,
      'https://m.media-amazon.com/images/M/MV5BZTYwYjJhNzYtY2ZiZS00ZmYxLWJkZjctYjRlNGIxYjI3ZTU0XkEyXkFqcGc@._V1_SX300.jpg',
      genre,
      runtime,
      year
    )

    cy.get('[data-id="movie-search-input"]').type(movieName)
    cy.wait(`@mockedMovie-${movieName}`)

    cy.get('[data-id="see-more-btn"]').click()

    cy.location('pathname').should(
      'match',
      new RegExp(`/movie-details/${movieName}`, 'i')
    )

    cy.get('[data-id="movie-details-poster"]').should(
      'have.attr',
      'src',
      'https://m.media-amazon.com/images/M/MV5BZTYwYjJhNzYtY2ZiZS00ZmYxLWJkZjctYjRlNGIxYjI3ZTU0XkEyXkFqcGc@._V1_SX300.jpg'
    )

    cy.get('[data-id="movie-detail-title"]').should('have.text', movieName)
    cy.get('[data-id="movie-details-genre"]').should('have.text', genre)
    cy.get('[data-id="movie-details-runtime"]').should('have.text', runtime)
    cy.get('[data-id="movie-details-year"]').should('have.text', year)
  })

  it('no movie found error', () => {
    cy.get('[data-id="movie-search-input"]').type('dwadwadwadwwd')

    cy.get('[data-id="home-page-error"]')
      .should('exist')
      .should('contain.text', 'No movie found')
  })
})
