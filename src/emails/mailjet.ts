import { v4 as uuid } from 'uuid'

import addresses from './addresses.json'
import { config } from '../config'
import { MailjetEmailBody, MailjetRequest } from './model'
import { POST } from '../helpers/httpHelper'

export async function sendEmail(gifURL: string) {
    const auth = `Basic ${Buffer.from(config.email.user + ':' + config.email.key).toString('base64')}`
    const headers = {
        Authorization: auth,
        'Content-Type': 'application/json',
    }

    const emailBody = getGIFEmailBody(gifURL)

    try {
        await POST(`${config.email.baseURL}${config.email.sendEmailPath}`, emailBody, headers)
    } catch (err) {
        throw new Error('mailjet error: could not send email')
    }
}

function getGIFEmailBody(gifURL: string): MailjetRequest {
    const messages = addresses.emails.map((mail) => {
        const req: MailjetEmailBody = {
            From: {
                Email: config.email.email,
                Name: 'GIF Of The Day',
            },
            To: [
                {
                    Email: mail,
                },
            ],
            Subject: 'Have a great day today!',
            HTMLPart: `<img src='${gifURL}'/>`,
            CustomId: uuid(),
        }
        return req
    })

    const body: MailjetRequest = {
        Messages: messages,
    }

    return body
}
