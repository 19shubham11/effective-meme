export interface MailjetRequest {
    Messages: MailjetEmailBody[]
}

export interface MailjetEmailBody {
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
