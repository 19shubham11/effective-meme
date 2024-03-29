# gif-email-bot :robot: 
[![Node.js CI](https://github.com/19shubham11/effective-meme/actions/workflows/actions.yml/badge.svg?branch=main)](https://github.com/19shubham11/effective-meme/actions/workflows/actions.yml)

[![Netlify Status](https://api.netlify.com/api/v1/badges/9b0bc138-873a-48a3-99e0-b963ec416461/deploy-status)](https://app.netlify.com/sites/gif-bot/deploys)

This is a fun app written in TypeScript that sends a random gif to a given email address! I have deployed this on Netlify and the first email I get every morning is a fun gif!

![Alt text](https://media.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif)

I am currently using Mailjet API to send emails, however this can be further extended in the future to serve as a Twitter/Telegram bot as well, and not just limited to emails.

For GIFs I am using the GIPHY API.

More details on the respective APIs and how to get the keys -
- GIPHY - https://developers.giphy.com/docs/api#quick-start-guide
- Mailjet - https://dev.mailjet.com/email/guides/getting-started/

## Possible future improvements
- Use a database for emails - Currently it's just my email, however, if I want to spam my friends as well, `emails.json` file might not be the safest. 
- Add API to add/remove emails.
