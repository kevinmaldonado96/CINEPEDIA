import {waitForAngularReady} from "@angular/cdk/testing/selenium-webdriver";
import {Subject} from "rxjs";
import {S} from "@angular/cdk/keycodes";

describe('Test associate platform to movie', () => {
  it('should success associate platform to movie', () => {
    cy.visit('/');
    cy.get('a[routerlink="movies"]').click();
    cy.wait(500);

    cy.get(".card").then($cards => {
      const randomIndex = Math.floor(Math.random() * $cards.length);
      //cy.wrap($cards[randomIndex]).click();
      let card = cy.wrap($cards[randomIndex]);
      card.find('input[name=movie-id]')
        .invoke('val')
        .then(movieId => {
          cy.get('#btn-options-' + movieId).click();
          cy.get('#menu-associate-platform-' + movieId).click().then(openModal => {
            cy.get('.option-list-platform').first().click().then(option => {
              let platformName = option.text();
              cy.get('#btn-associate-platform').click();
              cy.get('button.swal2-confirm.swal2-styled').click();
              cy.wrap($cards[randomIndex]).click();
              cy.wait(1000);
              cy.get('div#mat-tab-label-0-1').click();
              cy.wait(500);
              cy.get('.list-platforms').should("contain", platformName);
            });
          });
      });
    });


    /*cy.get('input[name=movie-id]')
      .invoke('val')
      .then((text) => {
        cy.get('#btn-options-' + text).click();
        cy.get('.menu-associate-platform').then(cards => {
          const randomIndex = Math.floor(Math.random() * cards.length);

          cy.wrap(cards[randomIndex]).click().then(menuPlatform => {
            cy.wait(1000);
            cy.get('.option-list-platform').first().click().then(option => {
              let platformName = option.text();
              cy.get('#btn-associate-platform').click();
              cy.get('button.swal2-confirm.swal2-styled').click();
              cy.get('.container-card').first().click();
              cy.wait(1000);
              cy.get('div#mat-tab-label-0-1').click();
              cy.wait(500);
              cy.get('.list-platforms').should("contain", platformName);
            });
          });
        })
      });*/
  });

});
