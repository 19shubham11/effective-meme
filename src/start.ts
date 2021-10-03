//adding this since the index file will be scheduled and does not need to send an email every time the app starts
import { config } from './config'

if (!config.email.key || !config.gif.apiKey) {
    console.error('Check Env variables! 🛑')
} else {
    console.log('Everything looks good 🚀')
}
