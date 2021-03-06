interface GiphyConfig {
    baseURL: string
    path: string
    apiKey: string
}

interface AppConfig {
    giphy: GiphyConfig
}

const giphyConfig: GiphyConfig = {
    baseURL: 'https://api.giphy.com',
    path: '/v1/gifs/random',
    apiKey: process.env.GIPHY_KEY || '',
}

const config: AppConfig = {
    giphy: giphyConfig,
}

export default config
