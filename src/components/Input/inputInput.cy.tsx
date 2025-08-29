import Input from './input'

describe('<Input />', () => {
  it('renders', () => {
    const placeholder = 'hello'

    cy.mount(<Input placeholder={placeholder} />)

    cy.get('input').should('have.attr', 'placeholder', placeholder)
  })
})
