// Código feito por Carlos Abraão
describe('Testes de navegação', () => {
  beforeEach(() => {
    cy.visit('https://automationteststore.com');
    cy.contains('Login or register').click();
    cy.login(Cypress.env('login'), Cypress.env('senha'));
    cy.get('[title="Login"]').click();
  });

  it('Deve navegar pelos produtos da categoria "Skincare" e verificar a URL', () => {
    cy.get('.nav-pills.categorymenu').within(() => {
      cy.contains('Skincare').click();
    });
    cy.url().should(
      'eq',
      'https://automationteststore.com/index.php?rt=product/category&path=43'
    );
    cy.contains('h1', 'Skincare').should('be.visible');
  });

  it('Deve verificar detalhes de um produto específico, validar a URL', () => {
    cy.get('.nav-pills.categorymenu').within(() => {
      cy.contains('Skincare').click();
    });
    cy.url().should(
      'eq',
      'https://automationteststore.com/index.php?rt=product/category&path=43'
    );
  });

  it('Deve realizar uma busca, verificar os resultados e validar a URL', () => {
    cy.get('#filter_keyword').type('cream');
    cy.get('div[title="Go"]').click();
    cy.url().should('include', 'keyword=cream');
    cy.contains('.prdocutname', 'Cream').should('exist');
  });

  it('Deve navegar entre múltiplas categorias e validar URLs estáticas', () => {
    const categories = {
      Fragrance:
        'https://automationteststore.com/index.php?rt=product/category&path=49',
      'Hair Care':
        'https://automationteststore.com/index.php?rt=product/category&path=52',
      Books:
        'https://automationteststore.com/index.php?rt=product/category&path=65',
    };

    Object.entries(categories).forEach(([category, url]) => {
      cy.get('.nav-pills.categorymenu').within(() => {
        cy.contains(category).click();
      });

      cy.url().should('eq', url);
      cy.contains('h1', category).should('be.visible');
    });
  });
});
