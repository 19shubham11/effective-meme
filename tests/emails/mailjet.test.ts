import assert from 'assert'
import nock from 'nock'
import config from '../../src/config'

import * as email from '../../src/emails/mailjet'

describe('Mailjet', () => {
    afterAll(nock.restore)
    afterEach(nock.cleanAll)

    it('Should return ok if mailjet returns 200', async () => {
        nock('https://api.mailjet.com').persist().post('/v3.1/send').reply(200)

        await assert.doesNotReject(email.sendEmail('https://mock-url'))
    })

    it('Should trow an error if mailjet does not return 200', async () => {
        nock('https://api.mailjet.com').persist().post('/v3.1/send').reply(400)

        await assert.rejects(email.sendEmail('https://mock-url'), (err) => {
            assert.match(err.message, /Mailjet Error/)
            return true
        })
    })
})
