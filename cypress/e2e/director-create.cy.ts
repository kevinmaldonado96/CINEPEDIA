describe('Test sobre la creacion de directores', () => {
  it('Crear director', () => {
    cy.visit('/');
    const testDirector = 'John Test';
    cy.get('a[routerlink="directors"]').click();
    cy.get('#openModalCreateBtn').click();
    cy.get('#formCreateDirector').within(() => {
      cy.get('input[id="name"]').type(testDirector);
      cy.wait(1000);
      cy.get('input[id="photo"]').type('https://i.blogs.es/fd79cd/ben-affleck-argo-director/450_1000.jpg');
      cy.get('input[id="birthDate"]').type('1990-01-01');
      cy.get('input[id="nationality"]').type('USA');
      cy.get('textarea[id="biography"]').type('John Doe');
      cy.get('button[type="submit"]').click();
    })
    cy.wait(1000);
    cy.get('#swal2-title').should('have.text', 'El director se ha creado con exito');
    cy.get('.swal2-actions button.swal2-confirm').click();
    cy.get('input[placeholder="Buscar director"]').type(testDirector);
    cy.get('#searchBtn').click();
    cy.wait(1000);
    cy.get('.blockquote h4').each((elemento) => {
      const textoElemento = elemento.text().toLowerCase(); // Convierte el texto del elemento a minúsculas
      expect(textoElemento).to.include(testDirector.toLowerCase());
    });
  });
});
