const API_KEY = process.env.SENDGRID_API_KEY || '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';

module.exports = function sendEmail(html) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(API_KEY);
    const msg = {
        to: 'neojamon@gmail.com',
        from: 'avengers-endgame-tickets@rmreyero.io',
        subject: 'Buy the tickets now',
        html: html,
    };
    sgMail.send(msg)
        .then(() => {
            console.log('ENJOY THE MOVIE');
        })
        .catch(error => {
            console.log(error);
            console.log(error.response.statusCode);
        });

};
