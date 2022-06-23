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

    it('Verifying the create new list form',function()
    {
        cy.scrollTo('center')
        cy.contains('Create new list').click()
        cy.get('mat-dialog-container[role="dialog"]').should('be.visible')
        cy.get('mat-dialog-container[role="dialog"]').contains('Create List')
        cy.get('i[type="button"]').click()//click on the cross icon
        cy.contains('Create new list').click()
        cy.contains('Cancel').click()
        
    })

    it("Verifying if we can create new list",function()
    {
        cy.contains('Create new list').click()
        cy.get('input[formcontrolname="list"]').type('Demo Session')
        cy.contains('Add List').click()
    })

    it('Verifying the negative scanerio of create new list',function()
    {
        cy.contains('Create new list').click()
        cy.get('input[formcontrolname="list"]').type('Te')
        cy.get('div[class="invalid-text ng-star-inserted"]').should('include.text','Required atleast 3 characters')
        cy.contains('Add List').click()

    })

})