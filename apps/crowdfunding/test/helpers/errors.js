const { makeErrorMappingProxy } = require('@aragon/test-helpers/utils')

const errors = makeErrorMappingProxy({
  // aragonOS errors
  APP_AUTH_FAILED: 'Returned error:  APP_AUTH_FAILED',
  INIT_ALREADY_INITIALIZED: 'Returned error:  INIT_ALREADY_INITIALIZED',
  INIT_NOT_INITIALIZED: 'INIT_NOT_INITIALIZED',
  RECOVER_DISALLOWED: 'RECOVER_DISALLOWED',

  // Crowdfunding errors
  CROWDFUNDING_DAC_NOT_EXIST: 'Returned error:  CROWDFUNDING_DAC_NOT_EXIST',
  CROWDFUNDING_CAMPAIGN_NOT_EXIST: 'Returned error:  CROWDFUNDING_CAMPAIGN_NOT_EXIST',
  CROWDFUNDING_TRANSFER_NOT_AUTHORIZED: 'Returned error:  CROWDFUNDING_TRANSFER_NOT_AUTHORIZED',
  CROWDFUNDING_TRANSFER_CAMPAIGN_NOT_BELONGS_DAC: 'Returned error:  CROWDFUNDING_TRANSFER_CAMPAIGN_NOT_BELONGS_DAC',
  CROWDFUNDING_TRANSFER_DONATION_NOT_BELONGS_ORIGIN: 'Returned error:  CROWDFUNDING_TRANSFER_DONATION_NOT_BELONGS_ORIGIN',

  CROWDFUNDING_WITHDRAW_NOT_AUTHORIZED: 'Returned error:  CROWDFUNDING_WITHDRAW_NOT_AUTHORIZED',

  CROWDFUNDING_MILESTONE_COMPLETE_NOT_AUTHORIZED: 'Returned error:  CROWDFUNDING_MILESTONE_COMPLETE_NOT_AUTHORIZED',
  CROWDFUNDING_MILESTONE_COMPLETE_NOT_ACTIVE: 'Returned error:  CROWDFUNDING_MILESTONE_COMPLETE_NOT_ACTIVE',

  CROWDFUNDING_MILESTONE_APPROVE_NOT_AUTHORIZED: 'Returned error:  CROWDFUNDING_MILESTONE_APPROVE_NOT_AUTHORIZED',
  CROWDFUNDING_MILESTONE_REJECT_NOT_AUTHORIZED: 'Returned error:  CROWDFUNDING_MILESTONE_REJECT_NOT_AUTHORIZED'
})

module.exports = {
  errors
}
