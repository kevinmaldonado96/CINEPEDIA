describe('Test sobre la creacion de actores', () => {
  it('Crear actor', () => {
    cy.visit('/');
    const testActor = 'Kevin Maldonado';
    cy.get('a[routerlink="actors"]').click();
    cy.get('#openModalCreateBtn').click();
    cy.get('#formCreateActor').within(() => {
      cy.get('input[id="nombreInput"]').type(testActor);
      cy.wait(1000);
      cy.get('input[id="fotoInput"]').type('https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/05/dwayne-johnson-Luke-Hobbs.jpg?resize=1200%2C707&quality=50&strip=all&ssl=1');
      cy.get('input[id="fechaNacimientoInput"]').type('1990-01-01');
      cy.get('input[id="nacionalidadInput"]').type('Colombia');
      cy.get('textarea[id="biografiaTextarea"]').type('This is my biography');
      cy.get('button[type="submit"]').click();
    })
    cy.wait(1000);
    cy.get('#swal2-title').should('have.text', `El actor se ha creado con exito`);
    cy.get('.swal2-actions button.swal2-confirm').click();
    cy.get('input[placeholder="Buscar Actor"]').type(testActor);
    cy.get('#searchButtonActor').click();
    cy.wait(1000);
    cy.get('.blockquote h4').each((elemento) => {
      const textoElemento = elemento.text().toLowerCase();
      expect(textoElemento).to.include(testActor.toLowerCase());
    });
  });
});
