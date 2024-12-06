describe('Test list-detail movies', () => {
  it('should validate detail with each movie', () => {
    cy.visit('/');
    cy.get('a[routerlink="movies"]').click();
    cy.get('app-card-movie').first().then(($elemento) => {
      const movieTitle = Cypress.$($elemento).find('.title').text();
      const releaseYear = Cypress.$($elemento).find('#release-year').text();
      cy.get('div.container-card').first().click();
      cy.wait(1000);
      cy.get('div#mat-tab-label-0-1').click();
      cy.wait(500);
      cy.get('#title-movie').should('contain.text', movieTitle);
      cy.get('#release-date').should('contain', releaseYear.split('|')[0]);
    });
  });
});
