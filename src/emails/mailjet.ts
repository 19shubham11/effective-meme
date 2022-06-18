import { v4 as uuid } from 'uuid'

import addresses from './addresses.json'
import { MailjetConfig } from '../config'
import { MailjetEmailBody, MailjetRequest } from './model'
import { POST } from '../helpers/httpHelper'

export interface API {
    sendEmail(gifURL: string): Promise<void>
}

export function initAPI(config: MailjetConfig): API {
    const senderEmail = config?.senderEmail

    async function sendEmail(gifURL: string) {
        const auth = `Basic ${Buffer.from(config?.mailjetUser + ':' + config?.apiKey).toString('base64')}`
        const headers = {
            Authorization: auth,
            'Content-Type': 'application/json',
        }

        const emailBody = getGIFEmailBody(gifURL, senderEmail)

        try {
            await POST(`${config?.baseURL}${config?.sendEmailPath}`, emailBody, headers)
        } catch (err) {
            throw new Error('mailjet error: could not send email')
        }
    }

    return { sendEmail }
}

function getGIFEmailBody(gifURL: string, senderEmail: string): MailjetRequest {
    const messages = addresses.emails.map((mail) => {
        const req: MailjetEmailBody = {
            From: {
                Email: senderEmail,
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
