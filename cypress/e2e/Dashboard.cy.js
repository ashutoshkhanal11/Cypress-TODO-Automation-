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
        cy.get('input[formcontrolname="list"]').type('Task Lists')
        cy.contains('Add List').click()
    })

    it('Verifying the negative scanerio of create new list',function()
    {
        cy.contains('Create new list').click()
        cy.get('input[formcontrolname="list"]').type('Te')
        cy.get('div[class="invalid-text ng-star-inserted"]').should('include.text','Required atleast 3 characters')
        cy.contains('Add List').click()

    })

    it('Verifying the add new task form',function()
    {
        cy.contains('Create New Task').click()
        cy.get('mat-dialog-container[role="dialog"]').contains('Create Task')
        cy.get('i[type="button"]').click()//click on the cross icon
        cy.contains('Create New Task').click()
        cy.contains('Cancel').click()

    })
    
    it('Verifying if we can create new task',function()
    {
        cy.createtask('Write Margin Trading','Task Lists','High','2022-06-23T11:30')
        
    })

    it('Verifying create new task with negative scanerio',function()
    {
        cy.createtask('aa','Test Scanerio','Medium','2022-16-21T11:30')
        cy.get('mat-error[class="mat-error ng-star-inserted"]').should('include.text','Task Name is invalid')
        cy.get('input[placeholder="start date"]').should('have.text','')
    })

    

})