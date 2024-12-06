describe('Test list movies', () => {
  it('sort movies asc by name', () => {
    cy.visit('/');
    cy.get('a[routerlink="movies"]').click();
    cy.wait(1000);
    cy.get('#ddSearchMovie').click();
    cy.get('li.dropdown-item:nth-child(1)').click();
    cy.wait(500);
    cy.get('.title').then((titleMovie) => {
      // Convertir los elementos a un arreglo de texto
      const elements = Array.from(titleMovie, (elemento) => elemento.innerText);
      // Clonar el arreglo original para ordenarlo
      const sortedElements = [...elements].sort();
      // Comparar el arreglo original con el arreglo ordenado
      expect(elements).to.deep.equal(sortedElements);
    });
  });

  it('sort movies asc by duration', () => {
    cy.visit('/');
    cy.get('a[routerlink="movies"]').click();
    cy.wait(1000);
    cy.get('#ddSearchMovie').click();
    cy.get('li.dropdown-item:nth-child(2)').click();
    cy.wait(500);
    cy.get('.release-year').then((titleMovie) => {
      // Convertir los elementos a un arreglo de texto
      const elements = Array.from(titleMovie, (elemento) => elemento.innerText);
      // Clonar el arreglo original para ordenarlo
      const sortedElements = [...elements].sort();
      // Comparar el arreglo original con el arreglo ordenado
      expect(elements).to.deep.equal(sortedElements);
    });
  });

  it('Filtrar por texto', () => {
    cy.visit('/');
    cy.get('a[routerlink="movies"]').click();
    const filterText = 'godz';
    cy.get('#filter-movie').type(filterText);
    // Espera a que se realice el filtrado (por ejemplo, mediante una solicitud AJAX)
    cy.wait(1000); // Ajusta el tiempo de espera según sea necesario
    // Verifica que solo se muestren los elementos que cumplen con el filtro
    cy.get('.title').each((title) => {
      const titleMovie = title.text().toLowerCase(); // Convierte el texto del elemento a minúsculas
      expect(titleMovie).to.include(filterText.toLowerCase());
    });
  });
});
