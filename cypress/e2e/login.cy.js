describe('Testes de Login', () => 
{

    beforeEach(()=>
    {
      cy.visit(Cypress.env("url"))

      cy.contains('Login or register')
        .click()
    })

    it('Deve tentar entrar com as credenciais válidas e logar com sucesso', () => 
    {
      cy.login(Cypress.env("login"), Cypress.env("senha"))
      
      cy.get('[title="Login"]')
        .click()

      cy.url()
        .should('eq',"https://automationteststore.com/index.php?rt=account/account")

    })

    it('Deve tentar entrar com a senha errada, receber retorno e não conseguir concluir o login', () => 
    {
      cy.login(Cypress.env("login"), "SENHAERRADA")
      cy.get('[title="Login"]')
        .click()

      cy.contains('Error: Incorrect login or password provided.')
        .should('be.visible')
    })

    it('Deve tentar entrar com o login inválido, receber retorno e não conseguir concluir o login',()=>
    {
      cy.login("LOGINERRADO", Cypress.env("senha"))

      cy.get('[title="Login"]')
        .click()

        cy.contains('Error: Incorrect login or password provided.')
          .should('be.visible')
    })





})