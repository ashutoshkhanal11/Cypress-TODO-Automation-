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
    

    it('Verifying if the task is added in task and in the list',function()
    {
        cy.wait(3000)
        cy.get('.today-tasks-wrapper div').then((data)=>
        {
            expect(data).to.contain('Write Margin Trading')
            expect(data).to.contain('High')
            expect(data).to.contain('Task Lists')

        })

        cy.get('#mat-expansion-panel-header-91').click()
        cy.get('#cdk-accordion-child-91 > div > div').should('be.visible')
        cy.get('#cdk-accordion-child-91 > div > div').then(function(data)
        {
            expect(data).to.contain('Write Margin Trading')
            expect(data).to.contain('High')
        })

        
    })


    it('Verify if the checkbox is ticked from both sides',function()
    {
       cy.checkbox(2)
       cy.get('span[class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"] input').eq(2).should('be.checked')
       cy.get('#mat-expansion-panel-header-91').click()
       cy.get('#cdk-accordion-child-91 > div > div').should('be.visible')
       cy.get('#cdk-accordion-child-91 > .mat-expansion-panel-body > .panel-content-wrapper > div > div > mat-checkbox > label > span > input')
       .eq(0).should('be.checked')

    })

    it('Verify if we can delete the task from the system',function()
    {
        cy.checkbox(2)
        cy.contains('Delete Task').click()
    })

})