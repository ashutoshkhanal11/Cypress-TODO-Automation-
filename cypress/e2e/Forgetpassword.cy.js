/// <reference types="Cypress" />
describe('Verify the dashboard functionality',function()
{
    
    this.beforeEach('To Visit Do App ForgetPassword Page',function()
    {
        cy.visit(Cypress.env('url')+"forgotPassword")
        cy.get('.container-left').should('be.visible')
        cy.get('.form-title').contains('Forgot your password ?')
    })

    it('Verifying forget password with valid credentials',function()
    {
        cy.get('#email').type('ashutoshkhanal11@gmail.com')
        cy.contains('Send').click()
        cy.get('#mat-dialog-1').should('be.visible')
        cy.get('h1').should('include.text','Email has been sent!')
        cy.get('#mat-dialog-1 > app-email-sent.ng-star-inserted > .emailSent-wrapper > .ant-btn').click()
        cy.url().should('include','/login')
    })

    it('Verifying forget password with invalid credentials',function()
    {
        cy.get('#email').type('ashutoshkhanal11')
        cy.get('.invalid-text').should('be.visible')
        cy.get('.invalid-text').should('include.text','Please Enter Valid Email')
        cy.get('#email').type('{enter}')
        cy.get('.message').should('be.visible')
        cy.get('.message').should('have.text','Email doesnot exist') 
    
    })

    it('Verifying if the login is clickable',function()
    {
        cy.logintext()
        cy.go('back')
        cy.url().should('include', '/forgotPassword') 
    })


})