import { postRequestBody, putRequestBody } from "../../fixtures/testData.json"
import 'cypress-plugin-steps'
import { StudentDetails } from "../../fixtures/studentTest";

describe("API-Automation Project01 ", () => {
  let student = new StudentDetails()
  let studentID

  it("TASK - 1: Get All Students", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}`,
    }).then((response) => {
      let isSudentIdPresentForAll = response.body.reduce((acc, element) => element.STUDENT_ID == false ? acc = false : acc, true)
      cy.step('Validate status code - 200').then(() => {
        expect(response.status).to.equal(200)
      })
      cy.step('Validate that there are at least 2 students').then(() => {
        expect(response.body.length).to.be.at.least(2)
      })
      cy.step('Validate that each student object has a property called STUDENT_ID').then(() => {
        expect(isSudentIdPresentForAll).to.be.true
      })
    });
  });

  it("TASK - 2: Create a New Student", () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env("baseUrl")}`,
      body: student.postRequestBody,
    }).then((response) => {
      const assertKeys = Object.keys(student.postRequestBody)

      // assertion tasks 
      cy.step('Validate status code - 201').then(() => {
        expect(response.status).to.equal(201)
      })

      cy.step('Validate that the STUDENT_ID is greater than 2').then(() => {
        studentID = response.body.STUDENT_ID
        expect(studentID).to.be.at.least(3)
      })

      assertKeys.forEach(assertKey => {
        cy.step(`Validate that the ${assertKey} matches the provided ${assertKey}`).then(() => {
          expect(response.body[assertKey]).to.eq(student[assertKey])
        })
      })
    })
  })


  it("TASK - 3: Get Newly Created Student", () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("baseUrl")}/${studentID}`
    }).then((response) => {
      const assertKeys = Object.keys(student.postRequestBody)

      // assertion tasks 
      cy.step('Validate status code - 200').then(() => {
        expect(response.status).to.equal(200)
      })

      cy.step('Validate that the STUDENT_ID matches the provided STUDENT_ID').then(() => {
        expect(response.body.STUDENT_ID).to.be.eq(studentID)
      })

      assertKeys.forEach(assertKey => {
        cy.step(`Validate that the ${assertKey} matches the provided ${assertKey}`).then(() => {
          assertKey != 'DOB' ? expect(response.body[assertKey]).to.eq(student[assertKey])
            : expect((response.body[assertKey]).slice(0, 10)).to.eq(student[assertKey])
        })
      })
    })
  })

  it("TASK - 4: Update Newly Created Student with a Different Instructor", () => {
    cy.request({
      method: 'PUT',
      url: `${Cypress.env("baseUrl")}/${studentID}`,
      body: student.putRequestBody
    }).then((response) => {

      // assertion tasks 
      cy.step('Validate status code - 200').then(() => {
        expect(response.status).to.equal(200)
      })

      cy.step(`3.	Validate that the response message is 'Successfully updated the student with the STUDENT_ID:  ${studentID}`).then(() => {
        const assertionMessage = `Successfully updated the student with the STUDENT_ID: ${studentID}`
        expect(response.body.message).to.be.eq(assertionMessage)
      })
    })
  })

  it("TASK - 5: Delete Newly Created Student", () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env("baseUrl")}/${studentID}`,

    }).then((response) => {
      // assertion tasks 
      cy.step('Validate status code - 204').then(() => {
        expect(response.status).to.equal(204)
      })
    })
  })

});
