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

  it('shows loading spinner', () => {
    cy.get('[data-id="movie-search-input"]').type('cars')
    cy.get('[data-id="home-page-loading-spinner"]').should('exist')
    cy.get('[data-id="home-page-movie-title"]').contains(/cars/i)
  })

  it('see more works', () => {
    cy.get('[data-id="movie-search-input"]').type('cars')
    cy.get('[data-id="see-more-btn"]').click()

    cy.location('pathname').should('eq', '/movie-details/Cars')
  })

  it('no movie found error', () => {
    cy.get('[data-id="movie-search-input"]').type('dwadwadwadwwd')

    cy.get('[data-id="home-page-error"]')
      .should('exist')
      .should('contain.text', 'No movie found')
  })
})
