describe('Test sobre la lista de actores', () => {
  it('Ordenar por nombre', () => {
    cy.visit('/');
    cy.get('a[routerlink="actors"]').click();
    cy.wait(1000);
    cy.get('#orderByName').click();
    cy.wait(1000);
    cy.get('.blockquote h4').then((lista) => {
      const elementos = Array.from(lista, (elemento) => elemento.innerText);
      const elementosOrdenados = [...elementos].sort().reverse();
      expect(elementos[0]).to.deep.equal(elementosOrdenados[0]);
    });
  });

  it('Ordenar por pais', () => {
    cy.visit('/');
    cy.get('a[routerlink="actors"]').click();
    cy.wait(1000);
    cy.get('#orderByCountry').click();
    cy.wait(1000);
    cy.get('.blockquote-footer small').then((lista) => {
      const elementos = Array.from(lista, (elemento) => elemento.innerText);
      const elementosOrdenados = [...elementos].sort().reverse();
      expect(elementos[0]).to.deep.equal(elementosOrdenados[0]);
    });
  });

  it('Filtrar actor por texto', () => {
    cy.visit('/');
    cy.get('a[routerlink="actors"]').click();
    const textoFiltro = 'Ru';
    cy.get('input[placeholder="Buscar Actor"]').type(textoFiltro);
    cy.get('#searchButtonActor').click();

    cy.wait(1000);

    cy.get('.blockquote h4').each((elemento) => {
      const textoElemento = elemento.text().toLowerCase();
      expect(textoElemento).to.include(textoFiltro.toLowerCase());
    });
  });
});

