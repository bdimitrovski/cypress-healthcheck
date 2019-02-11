beforeEach(() => {
  cy.visit('/')
})

describe('Simple test suite', () => {
  it('Has a navigation element which contains `Top`', () => {
    cy.get('.router-link-exact-active').should('contain', 'Top')
  })

  it('The navigation menu has 7 items', () => {
    cy.get('.inner').children().should('have.length', 7)
  })

  it('The item list has 19 items', () => {
    cy.get('ul').children().should('have.length', 19)
  })

  it('The most right menu item contains `Built with Vue.js`', () => {
    cy.get('.github').should('contain', 'Built with Vue.js')
  })

  it('Clicking an item opens it in a new tab', () => {
    cy.get(':nth-child(1) > .title > a').click()
  })
})