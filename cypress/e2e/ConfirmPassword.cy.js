/// <reference types="Cypress" />

describe('Verify the dashboard functionality',function()
{
    
    this.beforeEach('To Visit Do App Set Up Password Page',function()
    {
        cy.visit(Cypress.env('url')+"/signUp/setPassword")
        cy.get('.container-left').should('be.visible')
        cy.get('.form-title').contains('Set Your Password!')
        cy.get('.form-footer').should('include.text','Login')
    })

    it('Verifying valid new password field and Invalid confirm password ',function()
    {
        
        cy.confirmpassword('Ashutosh10#','Ashutosh1')
        cy.get(':nth-child(1) > .error-messages').should('be.visible')
        cy.get(':nth-child(1) > .error-messages').then((data)=>
        {
            expect(data).to.contain('Must Be atleast 8 characters!')
            expect(data).to.contain('Must contain atleast one special character!')
            expect(data).to.contain('Must contain atleast 1 number!')

        })
        cy.get(':nth-child(1) > .right-icon > .svg-inline--fa > path').click()
        cy.get('input[formcontrolname="password"]').should('have.value','Ashutosh10#')
        cy.get(':nth-child(1) > .right-icon > .svg-inline--fa > path').click()
        cy.get('input[formcontrolname="password"]').should('have.value','Ashutosh10#')
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('be.visible')
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('include.text','Password Must Match')
        cy.on('window:alert',(data) =>
        {
            expect(data).to.equals('Password  invalid')

        })         
    })
    
    it('Verifying with missing new password field ',function()
    {
        cy.get('input[formcontrolname="password"]').should('be.visible')
        cy.get('input[name="confirmPassword"]').type('Ashutosh10#')
        cy.get(':nth-child(2) > .right-icon > .svg-inline--fa > path').click()
        cy.get('input[name="confirmPassword"]').should('have.value','Ashutosh10#')
        cy.get(':nth-child(2) > .right-icon > .svg-inline--fa > path').click()
        cy.get('input[name="confirmPassword"]').should('have.value','Ashutosh10#')
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('be.visible')
        cy.get(':nth-child(2) > .error-messages > .invalid-text').should('include.text','Password Must Match')
        cy.contains('Sign up').click()
        cy.on('window:alert',(data) =>
        {
            expect(data).to.equals('Password  invalid')

        })         
    })

    it('Verifying with missing confirm password field ',function()
    {
        cy.get('input[formcontrolname="password"]').type('Ashutosh10#')
        cy.get(':nth-child(1) > .error-messages').should('be.visible')
        cy.get(':nth-child(1) > .error-messages').then((data)=>
        {
            expect(data).to.contain('Must Be atleast 8 characters!')
            expect(data).to.contain('Must contain atleast one special character!')
            expect(data).to.contain('Must contain atleast 1 number!')

        })
        cy.get(':nth-child(1) > .right-icon > .svg-inline--fa > path').click()
        cy.get('input[formcontrolname="password"]').should('have.value','Ashutosh10#')
        cy.get(':nth-child(1) > .right-icon > .svg-inline--fa > path').click()
        cy.get('input[formcontrolname="password"]').should('have.value','Ashutosh10#')
        cy.get('input[name="confirmPassword"]').should('be.visible')
        cy.get('.btn').click()         
    })

    it('Verifying if the login is clickable',function()
    {
        cy.logintext()
        cy.go('back')
        cy.url().should('include', '/signUp/setPassword') 
    })



})