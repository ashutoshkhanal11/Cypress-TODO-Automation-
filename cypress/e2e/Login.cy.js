/// <reference types="Cypress" />
describe('Verify the dashboard functionality',function()
{
    before(function () {
        cy.fixture('example').then(function (data) {
          this.data = data;
        })
      })

    this.beforeEach('To Visit Do App LoginPage',function()
    {
        cy.visit(Cypress.env('url')+"login")
        cy.get('.container-left').should('be.visible')
        cy.get('.form-title').contains('Login to your account')
    })

    it("Verifying Login with valid email and password",function()
    {
        cy.login(this.data.email,this.data.password) //Custom Command
        cy.get('.btn').click()
        cy.url().should('include','/dashboard')
    })

    it("Verifying Login with valid email and password using keypress {enter}",function()
    {
        cy.get('#email').type('ashutoshkhanal11@gmail.com')
        cy.get('#password').type('Manchester10#')
        cy.get('svg[data-icon="eye"]').click()
        cy.get('#password').should('have.value','Manchester10#')
        cy.get('svg[data-icon="eye-slash"]').click()
        cy.get('#password').should('have.value','Manchester10#')
        cy.get('#password').type('{enter}')
        cy.url().should('include','/dashboard')
    })

    it("Verifying Login with invalid email field and valid password",function()
    {
        cy.login('ashut@gmailcom','Demo1010#')
        cy.get(':nth-child(1) > .invalid-text').should('include.text','Invalid Input')
        cy.get('.btn').should('be.disabled') 
        cy.url().should('include','/login')
        
    })

    it("Verifying Login with valid email field and invalid password",function()
    {
        cy.login('ashut@gmail.com','demo010')
        cy.get(':nth-child(2) > .invalid-text').should('include.text','Invalid Input')
        cy.get('.btn').should('be.disabled') 
        cy.url().should('include','/login')
        
    })

    it('Verifying if the forget password is clickable',function()
    {
        cy.contains('Forgot Password').click()
        cy.url().should('include', '/forgotPassword')
        cy.get('.container-left').should('be.visible')
        cy.get('.container-left').contains('Forgot your password ?')
        cy.contains('Login').click()
        cy.url().should('include', '/login')

    })

    it('Verifying if the Create New Account is clickable',function()
    {
        cy.contains('Create New account').click()
        cy.url().should('include', '/signUp') 
        cy.get('.container-left').should('be.visible')
        cy.get('.form-title').contains('Create an account to get started with TODO APP')
        cy.contains('Login').click()
        cy.url().should('include', '/login') 
    })


})