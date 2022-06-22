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
        cy.get('input[formcontrolname="list"]').type('Test Scanerio')
        cy.contains('Add List').click()
        cy.get('.list-names-wrapper').contains('Test Scanerio')
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
        cy.createtask('Do the dashboard Testing','Test Scanerio','High','2022-06-21T11:30')
        
    })

    it('Verifying create new task with negative scanerio',function()
    {
        cy.createtask('aa','Test Scanerio','Medium','2022-16-21T11:30')
        cy.get('mat-error[class="mat-error ng-star-inserted"]').should('include.text','Task Name is invalid')
        cy.get('input[placeholder="start date"]').should('have.text','')
    })

    it('Verifying create new task with empty input',function()
    {
        cy.contains('Create New Task').click()
        cy.wait(5000)
        cy.contains('Add Task').click()
    })    

    it('Verifying if the task is added in task and in the list',function()
    {
        cy.get('.today-tasks-wrapper div').then((data)=>
        {
            expect(data).to.contain('Do the dashboard Testing')
            expect(data).to.contain('High')
            expect(data).to.contain('Test Scanerio')

        })

        cy.get('#mat-expansion-panel-header-87').click()
        cy.get('#cdk-accordion-child-87 > div > div').should('be.visible')
        cy.get('#cdk-accordion-child-87 > div > div').then(function(data)
        {
            expect(data).to.contain('Do the dashboard Testing')
            expect(data).to.contain('High')
        })

        
    })


    it('Verify if the checkbox is ticked from both sides',function()
    {
       cy.checkbox(2)
       cy.get('span[class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"] input').eq(2).should('be.checked')
       cy.get('#mat-expansion-panel-header-87').click()
       cy.get('#cdk-accordion-child-87 > div > div').should('be.visible')
       cy.get('#cdk-accordion-child-87 > .mat-expansion-panel-body > .panel-content-wrapper > div > div > mat-checkbox > label > span > input')
       .eq(0).should('be.checked')

    })

    it('Verify if we can delete the task from the system',function()
    {
        cy.checkbox(2)
        cy.contains('Delete Task').click()
    })

})