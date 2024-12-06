describe('Test sobre la creacion de generos', () => {
  it('Crear genero', () => {
    cy.visit('/');
    const testGenre = 'Genre Test';
    cy.get('a[data-bs-target="#genreModal"]').click();
    cy.get('form').within(() => {
      cy.get('input[id="type"]').type(testGenre);
      cy.get('button[type="submit"]').click();
    })
    cy.wait(1000);
    cy.get('#swal2-title').should('have.text', 'El genero se ha creado con exito');
    cy.get('.swal2-actions button.swal2-confirm').click();
    cy.get('tr:last-of-type td').should('have.text', testGenre);
  });
});
