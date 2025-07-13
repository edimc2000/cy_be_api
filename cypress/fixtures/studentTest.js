import { faker } from '@faker-js/faker'

export class StudentDetails {
  FIRST_NAME = `${faker.person.firstName()}`
  LAST_NAME = faker.person.lastName() + 'theIII'
  DOB = faker.date.birthdate().toISOString().slice(0, 10)
  EMAIL = faker.internet.email({ firstName: this.FIRST_NAME, lastName: this.LAST_NAME }).toLowerCase()
  INSTRUCTOR_ID = Math.floor( Math.random() * 3 + 1)
  INSTRUCTOR_ID_UPDATE = 4

  postRequestBody = {
    "DOB": `${this.DOB}`,
    "EMAIL": `${this.EMAIL}`,
    "FIRST_NAME": `${this.FIRST_NAME}`,
    "LAST_NAME": `${this.LAST_NAME}`,
    "INSTRUCTOR_ID": `${this.INSTRUCTOR_ID}`
  }

  putRequestBody = {
    "DOB": `${this.DOB}`,
    "EMAIL": `${this.EMAIL}`,
    "FIRST_NAME": `${this.FIRST_NAME}`,
    "LAST_NAME": `${this.LAST_NAME}`,
    "INSTRUCTOR_ID": `${this.INSTRUCTOR_ID_UPDATE}`
  }

}

