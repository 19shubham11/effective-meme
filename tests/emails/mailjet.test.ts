import assert from 'assert'
import nock from 'nock'
import config from '../../src/config'

import * as email from '../../src/emails/mailjet'

describe('Mailjet', () => {
    afterAll(nock.restore)
    afterEach(nock.cleanAll)
    describe('sendEmail', () => {
        it('Should return a promise if mailjet returns 200', async () => {
            nock(config.email.baseURL).persist().post(config.email.sendEmailPath).reply(200)

            await assert.doesNotReject(email.sendEmail('https://mock-url'))
        })

        it('Should trow an error if mailjet does not return 200', async () => {
            nock(config.email.baseURL).persist().post(config.email.sendEmailPath).reply(400)

            await assert.rejects(email.sendEmail('https://mock-url'), (err) => {
                assert.match(err.message, /Mailjet Error/)
                return true
            })
        })
    })
})
