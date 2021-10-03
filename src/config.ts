interface GiphyConfig {
    baseURL: string
    randomGIFPath: string
    apiKey: string
}

interface MailjetConfig {
    baseURL: string
    sendEmailPath: string
    email: string
    name: string
    user: string
    key: string
}

interface AppConfig {
    gif: GiphyConfig
    email: MailjetConfig
}

const giphyConfig: GiphyConfig = {
    baseURL: 'https://api.giphy.com',
    randomGIFPath: '/v1/gifs/random',
    apiKey: process.env.GIPHY_KEY || '',
}

const mailjetConfig: MailjetConfig = {
    baseURL: 'https://api.mailjet.com',
    sendEmailPath: '/v3.1/send',
    email: process.env.MAILJET_EMAIL || '',
    name: process.env.MAILJET_NAME || 'GIF Bot',
    user: process.env.MAILJET_USER || '',
    key: process.env.MAILJET_KEY || '',
}

export const config: AppConfig = {
    gif: giphyConfig,
    email: mailjetConfig,
}
