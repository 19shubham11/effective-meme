# gif-email-bot :robot:

This is a fun Node.js app written in TypeScript that sends an email of a random gif to a given email address! I have deployed this on Heroku with a scheduler and the first email I get every morning is a fun gif!

![Alt text](https://media.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif)


I am currently using Mailjet API to send emails, however this can be further extended in the future to serve as a Twitter/Telegram bot as well, and not just limited to emails.

## Possible future improvements
- Use a database for emails - Currently it's just my email, however, if I want to spam my friends as well, `emails.json` file might not be the safest. 
- Add API to add/remove emails.