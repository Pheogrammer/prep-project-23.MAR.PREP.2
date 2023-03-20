describe('Weather app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('searches for location and shows weather', () => {
    cy.get('#search-input').clear().type('London').type('{enter}')
    cy.get('#current-weather').should('be.visible')
  })

  it('can view articles', () => {
    cy.get('#search-input').clear().type('London').type('{enter}')
    cy.get('#current-weather').should('be.visible')
    cy.wait(3000)
    cy.get('.article-head').should('have.length.gt', 0)
    cy.get('.article-title').should('have.length.gt', 0)
    cy.get('.card-content').should('be.visible')
  })
})
