import { v4 as uuid } from 'uuid'

import addresses from './addresses.json'
import { Config } from '../config'
import { MailjetEmailBody, MailjetRequest } from './model'
import { POST } from '../helpers/httpHelper'

export interface API {
    sendEmail(gifURL: string): Promise<void>
}

export function initAPI(config: Config): API {
    const mailjetEmail = config.email.email

    async function sendEmail(gifURL: string) {
        const auth = `Basic ${Buffer.from(config.email?.user + ':' + config.email?.key).toString('base64')}`
        const headers = {
            Authorization: auth,
            'Content-Type': 'application/json',
        }

        const emailBody = getGIFEmailBody(gifURL, mailjetEmail)

        try {
            await POST(`${config.email?.baseURL}${config.email?.sendEmailPath}`, emailBody, headers)
        } catch (err) {
            throw new Error('mailjet error: could not send email')
        }
    }

    return { sendEmail }
}

function getGIFEmailBody(gifURL: string, email: string): MailjetRequest {
    const messages = addresses.emails.map((mail) => {
        const req: MailjetEmailBody = {
            From: {
                Email: email,
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
