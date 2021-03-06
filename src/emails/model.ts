interface MailjetRequest {
    Messages: MailjetEmailBody[]
}

interface MailjetEmailBody {
    From: EmailObject
    To: [EmailObject]
    Subject: string
    HTMLPart: string
    CustomId: string
}

interface EmailObject {
    Email: string
    Name?: string
}

export { MailjetRequest, MailjetEmailBody }
