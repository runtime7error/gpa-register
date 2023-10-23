// https://on.cypress.io/api

describe('Login tests', () => {
  it('Check texts of the view', () => {
    cy.visit('/')
    cy.get('.title').should('have.text', 'Bem-vindo!')
    cy.get('.user').should('have.text', 'Usuário')
    cy.get('.pass').should('have.text', 'Senha')
    cy.get('.forgot').should('have.text', 'Esqueci minha senha')
    cy.get('.btn-save').should('have.text', 'Entrar')
    cy.get('.sign-up').should('have.text', ' Não tem uma conta? Cadastre-se')
  })

  it('Check login error', () => {
    cy.visit('/')

    cy.get('.username').type('admin')
    cy.get('.password').type('278364823')

    cy.get('.btn-save').click()

    cy.get('.text-red-600').should('have.text', 'Usuário ou senha incorretos!')
  })

  it('Login', () => {
    cy.visit('/')

    cy.get('.username').type('admin')
    cy.get('.password').type('123456789')

    cy.get('.btn-save').click()
  })

  it('Checks the texts off offline page', () => {
    cy.visit('/')
    cy.get('.username').type('admin')
    cy.get('.password').type('123456789')

    cy.get('.btn-save').click()

    cy.get('.sorry').should('have.text', ' Desculpe! Parece que estamos offline. ')
    cy.get('.go-back').should('have.text', ' Voltar ')
  })
})
