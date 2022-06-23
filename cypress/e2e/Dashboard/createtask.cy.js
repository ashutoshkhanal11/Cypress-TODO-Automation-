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

    it('Verifying if we can submit empty task',function()
    {
        cy.contains('Create New Task').click()
        cy.wait(5000)
        cy.contains('Add Task').click()
    })


})