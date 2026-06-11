describe('Checkout Samsung Peru', () => {

  beforeEach(() => {
    cy.visit('https://stg2.shop.samsung.com/getcookie.html');

    cy.visit('https://stg2.shop.samsung.com/pe/cart');
  });

  it('Finaliza compra com cartão de crédito', () => {

    // Avançar do carrinho
    cy.contains(/continuar|checkout|comprar/i)
      .click();

    // Dados do cliente
    cy.get('input[name="email"]').type('qa.teste@samsung.com');
    cy.get('input[name="firstName"]').type('QA');
    cy.get('input[name="lastName"]').type('Automation');

    // Endereço
    cy.get('input[name="address1"]').type('Av. Teste 123');
    cy.get('input[name="city"]').type('Lima');

    cy.contains(/continuar/i).click();

    // Seleção do pagamento
    cy.contains(/tarjeta de crédito|credit card/i)
      .click();

    // Caso exista iframe
    cy.get('iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
      .within(() => {

        cy.get('input[name="cardnumber"]')
          .type(Cypress.env('CARD_NUMBER'));

        cy.get('input[name="exp-date"]')
          .type(Cypress.env('CARD_EXP'));

        cy.get('input[name="cvc"]')
          .type(Cypress.env('CARD_CVV'));

      });

    cy.contains(/finalizar|realizar pedido|pagar/i)
      .click();

    cy.url().should('include', 'confirmation');

  });

});