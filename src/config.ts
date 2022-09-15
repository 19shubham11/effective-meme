export interface GiphyConfig {
    baseURL: string
    randomGIFPath: string
    apiKey: string
}

export interface MailjetConfig {
    baseURL: string
    sendEmailPath: string
    senderEmail: string
    senderName: string
    mailjetUser: string
    apiKey: string
}

export interface Config {
    gif: GiphyConfig
    email: MailjetConfig
    apiKey: string
}

const giphyConfig: GiphyConfig = {
    baseURL: 'https://api.giphy.com',
    randomGIFPath: '/v1/gifs/random',
    apiKey: process.env.GIPHY_KEY || '',
}

const mailjetConfig: MailjetConfig = {
    baseURL: 'https://api.mailjet.com',
    sendEmailPath: '/v3.1/send',
    senderEmail: process.env.MAILJET_EMAIL || '',
    senderName: process.env.MAILJET_NAME || 'GIF Bot',
    mailjetUser: process.env.MAILJET_USER || '',
    apiKey: process.env.MAILJET_KEY || '',
}

export const config: Config = {
    gif: giphyConfig,
    email: mailjetConfig,
    apiKey: process.env.API_KEY || '',
}
