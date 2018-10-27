describe('Basic navigations tests', function() {
    it('Visits the root page', function() {
        cy.visit('/').wait(3000)
    })
    it('Visits the search page', function() {
        cy.visit('/search').wait(2000)
    })
    it('Visits the by clicking on the + button', function() {
        cy.visit('/').wait(3000).get('a').click().wait(2000)
    })
    it('Visits the by clicking on the + button and return to root page with close button', function() {
        cy.visit('/').wait(3000).get('a').click().wait(2000).get('a').click().wait(2000)
    })
})
