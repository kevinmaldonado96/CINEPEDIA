describe('Test sobre la lista de directores', () => {
  it('Ordenar por nombre', () => {
    cy.visit('/');
    cy.get('a[routerlink="directors"]').click();
    cy.get('#orderBtnName').click();
    cy.get('.blockquote h4').then((lista) => {
      // Convertir los elementos a un arreglo de texto
      const elementos = Array.from(lista, (elemento) => elemento.innerText);
      // Clonar el arreglo original para ordenarlo
      const elementosOrdenados = [...elementos].sort();
      // Comparar el arreglo original con el arreglo ordenado
      expect(elementos).to.deep.equal(elementosOrdenados);
    });
  });

  it('Ordenar por pais', () => {
    cy.visit('/');
    cy.get('a[routerlink="directors"]').click();
    cy.get('#orderBtnCountry').click();
    cy.get('.blockquote-footer small').then((lista) => {
      // Convertir los elementos a un arreglo de texto
      const elementos = Array.from(lista, (elemento) => elemento.innerText);
      // Clonar el arreglo original para ordenarlo
      const elementosOrdenados = [...elementos].sort();
      // Comparar el arreglo original con el arreglo ordenado
      expect(elementos).to.deep.equal(elementosOrdenados);
    });
  });

  it('Filtrar por texto', () => {
    cy.visit('/');
    cy.get('a[routerlink="directors"]').click();
    const textoFiltro = 'le';
    cy.get('input[placeholder="Buscar director"]').type(textoFiltro);
    cy.get('#searchBtn').click();
    // Espera a que se realice el filtrado (por ejemplo, mediante una solicitud AJAX)
    cy.wait(1000); // Ajusta el tiempo de espera según sea necesario
    // Verifica que solo se muestren los elementos que cumplen con el filtro
    cy.get('.blockquote h4').each((elemento) => {
      const textoElemento = elemento.text().toLowerCase(); // Convierte el texto del elemento a minúsculas
      expect(textoElemento).to.include(textoFiltro.toLowerCase());
    });
  });
});

