describe('Testes de usabilidade do carrinho', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com');
    cy.contains('Login or register').click();

    cy.login(Cypress.env('login'), Cypress.env('senha'));

    cy.get('[title="Login"]').click();

    cy.contains('li', 'Apparel & accessories');

    cy.get('.nav-pills.categorymenu').within(() => {
      cy.contains('li', 'Apparel & accessories').click();
    });

    cy.wait(2000);
  });

  it('Deve tentar adicionar mais de um item ao carrinho e obter sucesso', () => {
    cy.get('.fa fa-cart-plus fa-fw').click();

    cy.get('.class="cart"').click();

    cy.get('.productpagecart').click();

    cy.contains(
      'New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals'
    ).should('be.visible');
  });

  it('Deve tentar adicionar itens ao carrinho extrapolando o limite de compra e falhar', () => {
    cy.contains('li', 'Apparel & accessories');

    cy.get('.nav-pills.categorymenu').within(() => {
      cy.contains('li', 'Apparel & accessories').click();
    });

    cy.wait(2000);

    cy.get('ul.thumbnails > :nth-child(2) > :nth-child(1) > img').click(3);
    cy.get(':nth-child(1) > .thumbnail > .pricetag > .nostock').should(
      'have.text',
      'Out of Stock'
    );
    cy.get(
      '[title="Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie"]'
    ).click();

    cy.get('#product_quantity').type('11');

    cy.get('.productpagecart').click();

    cy.contains(
      "Allowed product's quantity exceeds. Quantity was set to maximum."
    ).should('be.visible');
  });

  it('Deve tentar adicionar um item ao carrinho com a quantidade igual a zero e falhar', () => {
    cy.contains('li', 'Apparel & accessories');

    cy.get('.nav-pills.categorymenu').within(() => {
      cy.contains('li', 'Apparel & accessories').click();
    });

    cy.wait(2000);

    cy.get(
      '[title="Designer Men Casual Formal Double Cuffs Grandad Band Collar Shirt Elegant Tie"]'
    ).click();

    cy.get('#product_quantity').type('11');

    cy.get('.productpagecart').click();

    cy.contains('Should have one or more itens.').should('be.visible');
  });
});
