describe('Test sobre la lista de plataforma', () => {
  it('Ordenar por nombre', () => {
    cy.visit('/');
    cy.get('a[routerlink="platforms"]').click();
    cy.wait(1000);
    cy.get('#orderByName').click();
    cy.wait(1000);
    cy.get('.blockquote h4').then((lista) => {
      const elementos = Array.from(lista, (elemento) => elemento.innerText);
      const elementosOrdenados = [...elementos].sort();
      expect(elementos[0]).to.deep.equal(elementosOrdenados[0]);
    });
  });
  it('Filtrar plataforma por texto', () => {
    cy.visit('/');
    cy.get('a[routerlink="platforms"]').click();
    const textoFiltro = 'Zo';
    cy.get('input[placeholder="Buscar Plataforma"]').type(textoFiltro);
    cy.get('#searchButtonActor').click();

    cy.wait(1000);

    cy.get('.blockquote h4').each((elemento) => {
      const textoElemento = elemento.text().toLowerCase();
      expect(textoElemento).to.include(textoFiltro.toLowerCase());
    });
  });
});

