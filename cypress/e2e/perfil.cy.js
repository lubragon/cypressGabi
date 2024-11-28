describe('Testes de edição no perfil', ()=>
    {
        beforeEach(()=>
            {
        
            })
        
            it('Deve ter sucesso ao editar informações pessoais do usuário com dados válidos', () => 
            {
              cy.visit('https://example.cypress.io')
            })
    
            it('Deve tentar atualizar as informações pessoais com valores em branco e falhar', () => 
            {
                cy.visit('https://example.cypress.io')
            })

            it('Deve tentar atualizar senha com valores válidos e ter sucesso', () => 
            {
                cy.visit('https://example.cypress.io')
            })
    
    
            
    
    
    
    })