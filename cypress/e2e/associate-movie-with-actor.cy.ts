import {waitForAngularReady} from "@angular/cdk/testing/selenium-webdriver";

describe('Test associate actor to movie', () => {
  it('should success associate actor to movie', () => {
    cy.visit('/');
    cy.get('a[routerlink="movies"]').click();
    cy.wait(500);
    let movie_id = cy.get('input[name=movie-id]')
      .invoke('val')
      .then((text) => {
        cy.get('#btn-options-' + text).click();
        cy.get('#menu-associate-actor').click();
        cy.wait(1000);
        cy.get('.option-list-actor').first().click().then(option => {
          let actorName = option.text();
          cy.get('#btn-associate-actor').click();
          cy.get('button.swal2-confirm.swal2-styled').click();
          cy.get('.container-card').first().click();
          cy.wait(1000);
          cy.get('div#mat-tab-label-0-1').click();
          cy.wait(500);
          cy.get('.list-actors').should("contain", actorName);
        });
      });
  });
});
