// @ts-check
///<reference path="../global.d.ts" />

import { wallet } from '../../cypress/fixtures/wallet'
import { getWalletDbInstance } from '../../cypress/helpers'
const baseUrl = Cypress.config().baseUrl
const password = Cypress.env('testPassword')

const walletDb = getWalletDbInstance()

// @ts-ignore
Cypress.Commands.add('getBySel', (selector: string, ...args: any) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

// @ts-ignore
Cypress.Commands.add('getBySelLike', (selector: string, ...args: any) => {
  return cy.get(`[data-test*=${selector}]`, ...args)
})

// @ts-ignore
Cypress.Commands.add(
  'addWallet',
  // @ts-ignore
  async (wallet: { key: string; value: Object<string, unknown> }) => {
    await walletDb.setItem(wallet.key, wallet.value)
  }
)

// @ts-ignore
Cypress.Commands.add('clearIndexedDB', async () => {
  await walletDb.clear()
})

// TODO - Replace with programmatic login
// @ts-ignore
Cypress.Commands.add('login', () => {
  cy.clearIndexedDB().then(() => {
    cy.addWallet(wallet).then(() => {
      cy.visit('')
      cy.getBySel('connect-wallet-button').click()
      cy.getBySel('wallet-native-button').click()
      cy.getBySel('wallet-native-load-button').click()
      cy.getBySel('native-saved-wallet-button').click()
      cy.getBySel('wallet-password-input').type(password)
      cy.getBySel('wallet-password-submit-button').click()
      cy.url({ timeout: 8000 }).should('equal', `${baseUrl}dashboard`)
    })
  })
})
