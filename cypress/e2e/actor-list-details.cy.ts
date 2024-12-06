describe('Test sobre el detalle del actor', () => {
  it('Validar que el detalle del actor y el numero de peliculas del actor sean iguales', () => {
    cy.visit('/');
    cy.get('a[routerlink="actors"]').click();
    cy.get('div.card').first().then(($elemento) => {
      const nombre = Cypress.$($elemento).find('h4').text();
      const peliculas = Cypress.$($elemento).find('.fst-italic').text();
      const nacionalidad = Cypress.$($elemento).find('footer.blockquote-footer').find('small').text();
      console.log('PELICULAS', peliculas, 'NOMBRE', nombre, 'NACIONALIDAD', nacionalidad);
      cy.get('div.card button').first().click();
      cy.wait(1000);
      cy.get('.movie-list .card').should('have.length', peliculas);
      cy.get('.actor-info .card-title ').should('have.text', nombre);
      cy.get('.actor-info h6').first().should('contain', nacionalidad);
    });
  });
});
