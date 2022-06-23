/// <reference types="Cypress" />

describe('Verify the dashboard functionality',function()
{
    this.beforeEach(function () {
        cy.fixture('example').then(function (data) {
          this.data = data;
        })
      })

    this.beforeEach('To Visit Do App DashboardPage',function()
    {
        cy.visit(Cypress.env('url')+"login")
        cy.login(this.data.email,this.data.password) //Custom Command
        cy.get('.btn').click()
        cy.url().should('include','/dashboard')
    })

    it('Verifying the dashboard navigation menu',function()
    {
        cy.get(':nth-child(1) > .col').should('include.text','AK')
        cy.get('h1[routerlink="/home"]').click()
        cy.url().should('include','/home')
        cy.go('back')//User should not go to the dashboard page
        cy.url().should('include','/dashboard')//issue of the dashboard page.
        cy.contains('Logout').click()
        cy.url().should('include','/home')
        cy.go('back')
        cy.on('window:confirm',(data)=>
        {
          expect(data).to.include('Please Login to Continue')  
        })
        cy.url().should('include','/login')
    })
    
    

})