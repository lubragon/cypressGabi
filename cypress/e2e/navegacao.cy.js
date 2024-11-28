describe('Testes de navegação', ()=>
{
    beforeEach(()=>
        {
          cy.visit('https://automationteststore.com')
          cy.contains('Login or register')
              .click();
  
          cy.login(Cypress.env("login"),Cypress.env("senha"))
  
          cy.get('[title="Login"]')
          .click()

    
        })
    
        it('Deve tentar navegar por produtos do catálogo e obter sucesso', () => 
        {
          cy.contains('li', 'Apparel & accessories');

          cy.get('.nav-pills.categorymenu').within(() => {
              cy.contains('li', 'Apparel & accessories')
                  .click();
          });
        })

        it('Deve tentar utilizar a funcionalidade de busca de produtos e obter sucesso', () => 
        {
            cy.visit('https://example.cypress.io')
        })

        



})