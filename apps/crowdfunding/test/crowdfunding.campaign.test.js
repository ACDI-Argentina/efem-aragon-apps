const { assertRevert } = require('@aragon/test-helpers/assertThrow')
const { getEventArgument } = require('@aragon/test-helpers/events')
const { newDao, newApp } = require('./helpers/dao')
const { setPermission } = require('./helpers/permissions')
const { newCrowdfunding, newDac, INFO_CID } = require('./helpers/crowdfunding')
const { errors } = require('./helpers/errors')
const Crowdfunding = artifacts.require('Crowdfunding')
const Vault = artifacts.require('Vault')

// 0: EntityType.Dac;
// 1: EntityType.Campaign;
// 2: EntityType.Milestone;
const ENTITY_TYPE_DAC = 0;
const ENTITY_TYPE_CAMPAIGN = 1;
const ENTITY_TYPE_MILESTONE = 2;

// 0: ButgetStatus.Butgeted;
const BUTGET_STATUS_BUTGETED = 0;

contract('Crowdfunding App - Campaign', ([deployer, giver, registeredUser, delegate, campaignManager, campaignReviewer, notAuthorized]) => {
    let crowdfundingBase, crowdfunding;
    let vaultBase, vault;
    let CREATE_DAC_ROLE
    let CREATE_CAMPAIGN_ROLE

    before(async () => {
        crowdfundingBase = await newCrowdfunding(deployer);
        vaultBase = await Vault.new({ from: deployer });
        // Setup constants
        CREATE_DAC_ROLE = await crowdfundingBase.CREATE_DAC_ROLE();
        CREATE_CAMPAIGN_ROLE = await crowdfundingBase.CREATE_CAMPAIGN_ROLE();
    })

    beforeEach(async () => {
        const { dao, acl } = await newDao(deployer);
        const crowdfundingAddress = await newApp(dao, "crowdfunding", crowdfundingBase.address, deployer);
        const vaultAddress = await newApp(dao, "vault", vaultBase.address, deployer);
        crowdfunding = await Crowdfunding.at(crowdfundingAddress);
        vault = await Vault.at(vaultAddress);
        await setPermission(acl, delegate, crowdfunding.address, CREATE_DAC_ROLE, deployer);
        await setPermission(acl, campaignManager, crowdfunding.address, CREATE_CAMPAIGN_ROLE, deployer);
        await vault.initialize()
        await crowdfunding.initialize(vault.address);
    })

    context('Seguridad', function() {

        it('Usuario no autorizado', async () => {

            let dacId = await newDac(crowdfunding, delegate);

            // El delegate no tiene configurada la autorización para crear campaigns.
            await assertRevert(
                crowdfunding.newCampaign(
                    INFO_CID,
                    dacId,
                    campaignReviewer,
                    { from: delegate })
                , errors.APP_AUTH_FAILED)
        })
    })

    context('Flujo normal de Campaigns', function() {

        it('Creación de Campaign', async () => {

            let dacId = await newDac(crowdfunding, delegate);

            let receipt = await crowdfunding.newCampaign(INFO_CID, dacId, campaignReviewer, { from: campaignManager });

            let campaignId = getEventArgument(receipt, 'NewCampaign', 'id');
            assert.equal(campaignId, 2);

            let campaigns = await crowdfunding.getAllCampaigns();
            assert.equal(campaigns.length, 1)
            let campaign = campaigns[0];
            assert.equal(campaign.id, 2);
            assert.equal(campaign.idIndex, 0);
            assert.equal(campaign.infoCid, INFO_CID);
            assert.equal(campaign.manager, campaignManager);
            assert.equal(campaign.reviewer, campaignReviewer);
            assert.equal(campaign.dacIds.length, 1);
            assert.equal(campaign.dacIds[0], dacId);

            let entities = await crowdfunding.getAllEntities();
            assert.equal(entities.length, 2);
            let entity = entities[1];
            assert.equal(entity.id, 2);
            assert.equal(entity.idIndex, 1);
            assert.equal(entity.entityType, ENTITY_TYPE_CAMPAIGN);
            assert.equal(entity.butgetId, 2);

            let butgets = await crowdfunding.getAllButgets();
            assert.equal(butgets.length, 2)
            let butget = butgets[1];
            assert.equal(butget.id, 2);
            assert.equal(butget.idIndex, 1);
            assert.equal(butget.amount, 0);
            assert.equal(butget.entityId, 2);
            assert.equal(butget.status, BUTGET_STATUS_BUTGETED);
        })
    })

    context('Flujos alternativos de Campaigns', function() {

        this.timeout(0);

        it('Creación de Campaign con Dac inexistente', async () => {

            // La Dac con Id 1 no existe.
            let dacId = 1;

            await assertRevert(crowdfunding.newCampaign(
                INFO_CID,
                dacId,
                campaignReviewer,
                { from: campaignManager }), errors.CROWDFUNDING_DAC_NOT_EXIST)
        })
    })
})
