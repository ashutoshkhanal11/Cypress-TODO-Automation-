/// <reference types="Cypress" />

describe('Verify the dashboard functionality',function()
{
    
    this.beforeEach('To Visit To Do App Register Page',function()
    {
        cy.visit(Cypress.env('url')+"/signUp")
        cy.get('.container-left').should('be.visible')
        cy.get('.form-title').contains('Create an account to get started with TODO APP')
        cy.get('.form-footer').should('include.text','Login')
    })

    it('Verify if user can register with valid credentials',function()
    {
        cy.register('Ram Hari','08/11/1999','Nepal','Nepal','9800000000','demomail@gmail.com')
        cy.url().should('include','/signUp/setPassword')
        cy.confirmpassword('Ashutosh10#','Ashutosh10#')
        cy.url().should('include','/dashboard')
    })

    it('Verify if user can register with missing name,gender',function()
    {
    
        cy.get('.mat-form-field-flex').type('08/11/1999')
        cy.get('.iti__selected-flag').click()
        cy.get('div[class="dropdown-menu country-dropdown show ng-star-inserted"]').should('be.visible')
        cy.get('div[class="dropdown-menu country-dropdown show ng-star-inserted"]').find('div input').type('Nepal')
        cy.get('ul[class="iti__country-list"]').contains('Nepal').click()
        cy.get('input[id="phone"]').type('9800000000')
        cy.get('input[id="email"]').type('demomail@gmail.com')
        cy.get('button[class="btn"]').click()
        cy.get('.invalid-text').should('be.visible')
        cy.get('.invalid-text').should('include.text','Name is Required')
        cy.get('.invalid-text').should('include.text','Gender is Required')

    })


    it('Verify if user can register with missing dob,phone no, mail',function()
    {
        cy.get('#name').type('Hari Prasad')
        cy.get('input[type="radio"]').each(($es,index)=>
        {
            if(index === 0)
            {
                cy.wrap($es).click({force: true})
            }
        })
        cy.get('button[class="btn"]').click()
        cy.get('.invalid-text').should('be.visible')
        cy.get('.invalid-text').then((data)=>{
            expect(data).to.contain('Date of Birth is Required')
            expect(data).to.contain('Email is Required')
            expect(data).to.contain('Please Enter Valid Email')
        })

    })

    it('Verifying negative testing for registration page',function()
    {
        cy.register('Ash 123','13/08/1999','12312','India','900000000','demomail@gmail')
        cy.get('.invalid-text').then((data)=>
        {
                expect(data).to.contain('Name can only contain letters')
                expect(data).to.contain('Date of Birth is Required')
                expect(data).to.contain('Please Enter Valid Phone')
                expect(data).to.contain('Please Enter Valid Email')
        })

    })

    it("Verifying Register Page with blank input",function()
    {
        cy.get('#name').type('{del}')
        cy.get('.mat-form-field-flex').type('{esc}')
        cy.get('input[id="phone"]').type('{esc}')
        cy.get('input[id="email"]').type('{esc}')
        cy.get('button[class="btn"]').click()
        cy.get('.invalid-text').then(function(data)
        {
            expect(data).to.contain('Name is Required')
            expect(data).to.contain('Gender is Required')
            expect(data).to.contain('Gender is Required')
            expect(data).to.contain('Phone Number is Required')
            expect(data).to.contain('Email is Required')
        })

    })

    it('Verifying if the login is clickable',function()
    {
       cy.logintext()
        cy.go('back')
        cy.url().should('include', '/signUp') 
    })


})