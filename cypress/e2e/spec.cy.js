describe('Userlane_Careers_NewApplication', () => {

  it('TC_NewApplication_QAPostion', () => {
    defaultCommandTimeout: 100000
    cy.clearCookies()
   
    //navigate to userlane careers url
    cy.visit('https://www.userlane.com/about/careers/')
    //cy.get('div#usercentrics-root').shadow().find('div[data-testid=uc-app-container]')
    //clicks on accept button
    //cy.get('div#usercentrics-root').shadow().find('div#uc-center-container').find('button[data-testid=uc-accept-all-button]').click()
    cy.get('div#usercentrics-root').shadow().find('div[data-testid=uc-app-container]').find('button[data-testid=uc-accept-all-button]').click()
    //clicks on close button on pop-up screen
   // cy.get('div.pum-container button.pum-close').click()

    //scroll down to view Automation test Engineer position with Germany as location and clicks on View job
    cy.get('div.careers-search-results div').find('div.loc-germany').contains('Automation Test Engineer ( Cypress/Typescript)')
    .parent('div').parent('div').find('a').contains('VIEW JOB', { matchCase: false }).click()

    cy.intercept(
      {
      
        url: '/userlane/*/thanks', // that have a URL that matches this
      }
       // and force the response to be: []
    ).as('resp') // and assign an alias

    //navigates to Automation Test Engineer application page
    cy.origin('https://jobs.lever.co', () => {
      //clicks on dismiss pop-up at bottom of page
      cy.get('button').contains('Dismiss').click({force: true})
      //click on Apply for this job button
      cy.get('a.postings-btn').contains('Apply for this job', { matchCase: false }).click()

      //Upload resume and enter data in mandatory fields
      cy.get('input[data-qa=input-resume]').selectFile ({
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'cypress/fixtures/demo_test.pdf'
      })
      cy.get('input[name=name]').type('Tester_1')
      cy.get('input[name=email]').type('fake@email.com')
      cy.get('input[name=phone]').type('+49-6546546546')
      cy.get('input.card-field-input').type('Around 70k euro')
      cy.get('[type="checkbox"]').check()
      //clicks on submit application button
      cy.get('button').contains('Submit application').click({force: true})

      //Verifies the reponse status code 
      //cy.wait('@resp').its('response.statusCode').should('eq', 200)
      //cy.wait('@resp').its('response.body').should('contain', 'Application submitted')
      
      cy.wait('@resp').then((interception) =>{
        const response = interception.response.body
        //console.log('interception : ', response)
        expect(interception.response.statusCode).equals(200)
        expect(response).contains('msg-submit-success')
        expect(response).contains('Application submitted')
        
    })
      
  })

  


  

})
  
})