require('dotenv').config('../../.env');
const config = {
    service: 'Gmail',
    auth: {
        user: process.env.SERVICE_EMAIL_USER,
        pass: process.env.SERVICE_EMAIL_PASSWORD
    },
}

module.exports = config;