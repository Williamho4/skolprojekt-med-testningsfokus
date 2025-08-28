import MovieCard from './movieCard'
import { MemoryRouter } from 'react-router-dom'

const seeMoreBtn = '[data-id="see-more-btn"]'

describe('<MovieCard />', () => {
  const movie = {
    Title: 'Cars',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
  }

  it('render movie poster and title', () => {
    cy.mount(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    )

    cy.get('[data-id="home-page-movie-img"]')
      .should('have.attr', 'src', movie.Poster)
      .should('have.attr', 'alt', movie.Title)

    cy.get('[data-id="home-page-movie-title"]').should('have.text', movie.Title)
  })

  it('shows no poster text', () => {
    cy.mount(
      <MemoryRouter>
        <MovieCard movie={{ Title: 'Cars', Poster: '' }} />
      </MemoryRouter>
    )

    cy.get('[data-id="home-page-no-poster-text"]').should('be.visible')
  })

  it('see more btn works', () => {
    cy.mount(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    )

    cy.get(seeMoreBtn).should('be.visible')
    cy.get(seeMoreBtn).should(
      'have.attr',
      'href',
      `/movie-details/${movie.Title}`
    )
  })
})
