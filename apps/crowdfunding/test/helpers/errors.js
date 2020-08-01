const { makeErrorMappingProxy } = require('@aragon/test-helpers/utils')

const errors = makeErrorMappingProxy({
  // aragonOS errors
  APP_AUTH_FAILED: 'Returned error:  APP_AUTH_FAILED',
  INIT_ALREADY_INITIALIZED: 'Returned error:  INIT_ALREADY_INITIALIZED',
  INIT_NOT_INITIALIZED: 'INIT_NOT_INITIALIZED',
  RECOVER_DISALLOWED: 'RECOVER_DISALLOWED',

  // Crowdfunding errors
  CROWDFUNDING_AUTH_FAILED: 'Returned error:  CROWDFUNDING_AUTH_FAILED',
  CROWDFUNDING_DAC_NOT_EXIST: 'Returned error:  CROWDFUNDING_DAC_NOT_EXIST',
  CROWDFUNDING_CAMPAIGN_NOT_EXIST: 'Returned error:  CROWDFUNDING_CAMPAIGN_NOT_EXIST',
  CROWDFUNDING_EXCHANGE_RATE_NOT_EXISTS: 'Returned error:  CROWDFUNDING_EXCHANGE_RATE_NOT_EXISTS',
  CROWDFUNDING_TRANSFER_NOT_AUTHORIZED: 'Returned error:  CROWDFUNDING_TRANSFER_NOT_AUTHORIZED',
  CROWDFUNDING_TRANSFER_CAMPAIGN_NOT_BELONGS_DAC: 'Returned error:  CROWDFUNDING_TRANSFER_CAMPAIGN_NOT_BELONGS_DAC',
  CROWDFUNDING_TRANSFER_DONATION_NOT_BELONGS_ORIGIN: 'Returned error:  CROWDFUNDING_TRANSFER_DONATION_NOT_BELONGS_ORIGIN',

  CROWDFUNDING_MILESTONE_COMPLETE_NOT_ACTIVE: 'Returned error:  CROWDFUNDING_MILESTONE_COMPLETE_NOT_ACTIVE',

  CROWDFUNDING_WITHDRAW_NOT_APPROVED: 'Returned error:  CROWDFUNDING_WITHDRAW_NOT_APPROVED'
})

module.exports = {
  errors
}