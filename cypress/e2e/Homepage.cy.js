/// <reference types="Cypress" />
describe('Verify the dashboard functionality',function()
{
    this.beforeEach('To Visit Do App Homepage',function()
    {
        cy.visit(Cypress.env('url')+"home")
    })
    
    it('Verifying if the menu is clickable or not',function()
    {
        cy.contains('Home').click()
        cy.get('nav').should('be.visible')
        cy.contains('Login').click()
        cy.get('.container-left').should('be.visible')
        cy.get('.form-title').contains('Login to your account')
        cy.go('back')
        cy.url().should('include', '/home') 
        cy.contains('Dashboard').click()
        cy.on('window:confirm',(data) =>
        {
            expect(data).to.equals('Please Login to Continue')

        })    
        cy.url().should('include', '/login')
        cy.go('back')
        cy.url().should('include', '/home') 
        cy.contains('Sign Up').click()
        cy.url().should('include', '/signUp') 
        cy.get('.container-left').should('be.visible')
        cy.get('.form-title').contains('Create an account to get started with TODO APP')
        cy.go('back')
        cy.url().should('include', '/home') 
        cy.contains('Reset Password').click()
        cy.on('window:confirm',(data) =>
        {
            expect(data).to.equals('Please Login to Continue')

        }) 
        cy.url().should('include', '/login')
        cy.go('back') 
        cy.contains('Forgot Password').click()
        cy.url().should('include', '/forgotPassword')
        cy.get('.container-left').should('be.visible')
        cy.get('.container-left').contains('Forgot your password ?')
        cy.go('back')
        cy.url().should('include', '/home')

    })

    
})