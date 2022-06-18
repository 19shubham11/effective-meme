import assert from 'assert'
import nock from 'nock'

import { MailjetConfig } from '../../src/config'
import * as email from '../../src/emails/mailjet'

describe('Mailjet', () => {
    const config: MailjetConfig = {
        baseURL: 'http://api.mailjet.com',
        sendEmailPath: '/v3.1/send',
        senderEmail: 'test@test.com',
        senderName: 'test conf',
        mailjetUser: 'test',
        apiKey: 'ewfre',
    }

    afterAll(nock.restore)
    afterEach(nock.cleanAll)

    const mailjetAPI = email.initAPI(config)

    describe('sendEmail', () => {
        it('Should return a promise if mailjet returns 200', async () => {
            nock(config.baseURL).persist().post(config.sendEmailPath).reply(200)

            await assert.doesNotReject(mailjetAPI.sendEmail('https://mock-url'))
        })

        it('Should trow an error if mailjet does not return 200', async () => {
            nock(config.baseURL).persist().post(config.sendEmailPath).reply(400)

            await assert.rejects(mailjetAPI.sendEmail('https://mock-url'), (err: Error) => {
                assert.match(err.message, /mailjet error/)
                return true
            })
        })
    })
})
