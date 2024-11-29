describe('Testes de funcionalidade de câmbio', () => {
  const currencies = {
    EUR: '€ Euro',
    GBP: '£ Pound Sterling',
    USD: '$ US Dollar',
  };

  beforeEach(() => {
    cy.visit('https://automationteststore.com');
    cy.contains('Login or register').click();
    cy.login(Cypress.env('login'), Cypress.env('senha'));
    cy.get('[title="Login"]').click();
  });

  it('Deve trocar de moeda e validar a URL e o rótulo', () => {
    Object.entries(currencies).forEach(([currencyCode, currencyLabel]) => {
      cy.get('li.dropdown.hover > a.dropdown-toggle').first().click();
      cy.get('.dropdown-menu.currency').contains(currencyLabel).click();
      cy.url().should('include', `currency=${currencyCode}`);
      cy.get('li.dropdown.hover > a.dropdown-toggle > span').should(
        'contain.text',
        currencyLabel
      );
    });
  });

  it('Deve verificar persistência de moeda ao navegar entre páginas', () => {
    cy.get('li.dropdown.hover > a.dropdown-toggle').first().click();
    cy.get('.dropdown-menu.currency').contains('€ Euro').click();
    cy.url().should('include', 'currency=EUR');

    cy.get('.nav-pills.categorymenu').within(() => {
      cy.contains('Skincare').click();
    });

    cy.get('li.dropdown.hover > a.dropdown-toggle > span').should(
      'contain.text',
      '€ Euro'
    );
  });

  it('Deve validar que a moeda não muda ao selecionar a mesma moeda', () => {
    cy.get('li.dropdown.hover > a.dropdown-toggle').first().click();
    cy.get('.dropdown-menu.currency').contains('£ Pound Sterling').click();
    cy.url().should('include', 'currency=GBP');

    cy.get('li.dropdown.hover > a.dropdown-toggle').first().click();
    cy.get('.dropdown-menu.currency').contains('£ Pound Sterling').click();

    cy.url().should('include', 'currency=GBP');
    cy.get('li.dropdown.hover > a.dropdown-toggle > span').should(
      'contain.text',
      '£ Pound Sterling'
    );
  });

  it('Deve verificar se a moeda se mantem a mesma após recarregar a página', () => {
    cy.get('li.dropdown.hover > a.dropdown-toggle').first().click();
    cy.get('.dropdown-menu.currency').contains('€ Euro').click();

    cy.reload();
    cy.wait(1000);

    cy.get('li.dropdown.hover > a.dropdown-toggle').then(($el) => {
      const currencyText = $el.find('span').text().trim();
      cy.log('Texto da moeda:', currencyText);
      expect(currencyText).to.include('€ Euro');
    });
  });
});
