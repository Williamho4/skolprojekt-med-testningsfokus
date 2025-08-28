import MovieDetailsCard from './movieDetailsCard'

describe('<MovieDetailsCard />', () => {
  const movie = {
    Title: 'Cars',
    Genre: 'Action',
    Plot: 'Cars Racing Cars',
    Year: '2005',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
    Runtime: '1 hour',
  }

  it('shows movie poster', () => {
    cy.mount(<MovieDetailsCard movie={movie} />)

    cy.get('[data-id="movie-details-poster"]')
      .should('have.attr', 'src', movie.Poster)
      .should('have.attr', 'alt', movie.Title)
  })

  it('shows no poster text', () => {
    const movieWithoutPoster = { ...movie, Poster: '' }

    cy.mount(<MovieDetailsCard movie={movieWithoutPoster} />)

    cy.contains('No poster')
  })

  it('shows right movie info', () => {
    cy.mount(<MovieDetailsCard movie={movie} />)

    cy.get('[data-id="movie-details-plot"]').should('have.text', movie.Plot)
    cy.get('[data-id="movie-details-genre"]').should('have.text', movie.Genre)
    cy.get('[data-id="movie-details-runtime"]').should(
      'have.text',
      movie.Runtime
    )
    cy.get('[data-id="movie-details-year"]').should('have.text', movie.Year)
  })
})
