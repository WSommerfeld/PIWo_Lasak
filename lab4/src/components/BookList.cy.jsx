import React from 'react'
import BookList from './BookList'

describe('<BookList />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<BookList />)
  })
})