describe('Test sobre la creacion de plataformas', () => {
  it('Crear plataformas', () => {
    cy.visit('/');
    const testPlatform = 'Netflix';
    cy.get('a[routerlink="platforms"]').click();
    cy.get('#openModalCreateBtn').click();
    cy.get('#formCreatePlatform').within(() => {
      cy.get('input[id="nombreInput"]').type(testPlatform);
      cy.wait(1000);
      cy.get('input[id="urlInput"]').type('https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/05/dwayne-johnson-Luke-Hobbs.jpg?resize=1200%2C707&quality=50&strip=all&ssl=1');
      cy.get('button[type="submit"]').click();
    })
    cy.wait(1000);
    cy.get('#swal2-title').should('have.text', `La plataforma se ha creado con exito`);
    cy.get('.swal2-actions button.swal2-confirm').click();
    cy.get('input[placeholder="Buscar Plataforma"]').type(testPlatform);
    cy.get('#searchButtonActor').click();
    cy.wait(1000);
    cy.get('.blockquote h4').each((elemento) => {
      const textoElemento = elemento.text().toLowerCase();
      expect(textoElemento).to.include(testPlatform.toLowerCase());
    });
  });
});
