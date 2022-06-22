// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => { 
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    
})
Cypress.Commands.add('confirmpassword', (newpassword, confirmPassword) => { 
    cy.get('input[formcontrolname="password"]').type(newpassword)
    cy.get('input[name="confirmPassword"]').type(confirmPassword)
    cy.get('.btn').click()
    
})

Cypress.Commands.add('register', (name,dob, country,countries,phoneno,email) => { 
    cy.get('#name').type(name)
    cy.get('input[type="radio"]').each(($es,index)=>
    {
        if(index === 0)
        {
            cy.wrap($es).click({force: true})
        }
    })
    cy.get('input[type="radio"]').should('be.checked')
    cy.get('.mat-form-field-flex').type(dob)
    cy.get('.iti__selected-flag').click()
    cy.get('div[class="dropdown-menu country-dropdown show ng-star-inserted"]').should('be.visible')
    cy.get('div[class="dropdown-menu country-dropdown show ng-star-inserted"]').find('div input').type(country)
    cy.get('ul[class="iti__country-list"]').contains(countries).click()
    cy.get('input[id="phone"]').type(phoneno)
    cy.get('input[id="email"]').type(email)
    cy.get('button[class="btn"]').click()
    
})

Cypress.Commands.add('createtask', (taskname,lists,priority,date) =>{
    cy.contains('Create New Task').click()
    cy.wait(5000)
    cy.get('input[id="taskName"]').type(taskname)
    cy.contains('Choose List Name *').click({force:true})
    cy.get('div[role="listbox"]').contains(lists).click()
    cy.contains('Choose Priority *').click({force:true})
    cy.get('div[role="listbox"]').contains(priority).click()
    cy.get('input[placeholder="start date"]').type(date,{force: true})
    cy.contains('Add Task').click()

})

Cypress.Commands.add('checkbox', (indexnumber) => 
{
       cy.get('span[class="mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin"] input').each(($es,index)=>
    {
        if(index == indexnumber)
        {
            cy.wrap($es).click({force:true})
        }

    })

})

Cypress.Commands.add('logintext', (indexnumber) => 
{
    cy.contains('Login').click()
    cy.url().should('include', '/login') 
    cy.get('.container-left').should('be.visible')
    cy.get('.form-title').contains('Login to your account')

})
