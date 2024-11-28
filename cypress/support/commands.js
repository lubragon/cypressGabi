Cypress.Commands.add('login', (login, senha)=>
{
    cy.get('#loginFrm_loginname')
        .type(login)
    cy.get('#loginFrm_password')
        .type(senha)
})