interface GiphyConfig {
    baseURL: string
    path: string
    apiKey: string
}

interface MailjetConfig {
    url: string
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
    path: '/v1/gifs/random',
    apiKey: process.env.GIPHY_KEY || '',
}

const mailjetConfig: MailjetConfig = {
    url: 'https://api.mailjet.com/v3.1/send',
    email: process.env.MAILJET_EMAIL || '',
    name: process.env.MAILJET_NAME || 'GIF Bot',
    user: process.env.MAILJET_USER || '',
    key: process.env.MAILJET_KEY || '',
}

const config: AppConfig = {
    gif: giphyConfig,
    email: mailjetConfig,
}

export default config
