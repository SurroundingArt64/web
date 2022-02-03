import { makeAccount } from '../../cypress/factories/ethereum/account'

const publicKey = Cypress.env('testPublicKey')
const ethereumApi = Cypress.env('REACT_APP_UNCHAINED_ETHEREUM_HTTP_URL')

beforeEach(() => {
  // Cypress already automatically clears localStorage, cookies, sessions, etc. before each test
  // We do, however, need to clear indexedDB during login to clear any saved wallet data
  cy.login()
})

describe('The Dashboard', () => {
  before(() => {
    // Intercept all account requests relating to our test wallet
    const account = makeAccount()
    cy.intercept('GET', `${ethereumApi}/api/v1/account/${publicKey}`, account).as('getAccount')
  })

  it('displays the expected account rows', () => {
    cy.getBySel('dashboard-account-row').should('have.length', 7)
    // TODO - Check each account row values
    // TODO - Open account and check transactions and values
  })

  // it('displays the correct total balance', () => {
  //   // mock token price response
  //   // Check in different fiat currencies
  // })
  //
  // it('displays the expected graph and intervals', () => {
  //
  // })
  //
  // it('displays data in titles for expected data-points', () => {
  //
  // })
  //
  // it('displays the expected graph and intervals', () => {
  //
  // })
  //
  // it('displays the expected graph and intervals', () => {
  //
  // })
  //
  // it('supports trades', () => {
  //
  // })
  //
  // it('supports send transaction setup', () => {
  //
  // })
  //
  // it('supports receive transaction setup', () => {
  //
  // })
})
