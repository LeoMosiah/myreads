describe('Search page test', function() {
    beforeEach(function () {
        cy.visit('/search').wait(2000)
    })
    it('Search with one word value', function() {
        cy.get('input[type=text]').type('Android').wait(2000)
    })
    it('Search with two word value ', function () {
        cy.get('input[type=text]').type('Artificial Intelligence').wait(2000)
    });
    it('Search value which not returns a book cover', function () {
        cy.get('input[type=text]').type('Biography').wait(2000)
    });
})