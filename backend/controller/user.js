const configServiceEmail = require('../config/serviceEmail');
const templateEmail = require('../templates/welcome');
const nodemailer = require('nodemailer');
const connection = require('../config/database');
const Service = require('../services/http_response');
const { networkInterfaces } = require('os');
const nets = networkInterfaces();
/**
 * @author Hector Rodrigues Da Silva
 */

module.exports = {

    /**
     *
     * @param request
     * @param response
     * @method POST
     * @return {*}
     */
    setUser: (request, response) => {
        const { username, email, password } = request.body;
        const queryValidateExistingUser =
            `SELECT * FROM profile_app 
             WHERE name_user='${username}' OR email_user='${email}'`;

        connection.query(queryValidateExistingUser, (err, resultsGetUser) => {
            if(err) throw err;
            if(resultsGetUser.length <= 0) {
                const querySetUser =
                    `INSERT INTO profile_app 
                     SET 
                        name_user='${username}',
                        email_user='${email}'`;

                const queryCreateLogin =
                    `INSERT INTO login
                     SET 
                        login_user='${email}',
                        password_user='${password}'`;

                connection.query(querySetUser, (err, resultsSetUser) => {
                    if(err) throw err;
                    if(resultsSetUser) {

                        let resultsNetwork = null;
                        // GET IPV4 IP ADDRESS SERVER
                        for (const name of Object.keys(nets)) {
                            for (const net of nets[name]) {
                                if (net.family === 'IPv4' && !net.internal) {
                                    resultsNetwork = net.address;
                                }
                            }
                        }

                        const instanceDate = new Date();
                        const dateHours = `${instanceDate.getHours()}:${instanceDate.getMinutes()}`;
                        const templateEmailWelcome = templateEmail.emailWelcome(username, email, password, dateHours, resultsNetwork);
                        const mailOptions = {
                            from: configServiceEmail.auth.user,
                            to: email,
                            subject: 'Bem vindo ao WhatsApp Web FullCam',
                            html: templateEmailWelcome
                        };

                        nodemailer.createTransport(configServiceEmail).sendMail(mailOptions, (err, results) => {
                            if (err)
                                console.log({ error: `Failed send email welcome`, status: err });
                            console.log({ success: `Success send email welcome`, status: results });
                        });

                        connection.query(queryCreateLogin, (err, resultsCreateUser) => {
                            if(err) throw err;
                            Service.HTTP_CUSTOM_RESPONSE(200, 'send', resultsCreateUser, response);
                        })
                    }
                })
            } else {
                Service.HTTP_CUSTOM_RESPONSE(409, 'send', { error: 'user is existing' }, response);
            }
        })
    },

    /**
     *
     * @param request
     * @param response
     */
    updateUser: (request, response) => {
        const id = request.params.id;
        const { username } = request.body;

        const queryUpdateUser = `UPDATE profile_app SET name_user='${username}' WHERE id = ${id}`;
        connection.query(queryUpdateUser, (err, resultsUpdateUser) => {
            if(err) throw err;
            Service.HTTP_CUSTOM_RESPONSE(200, 'send', resultsUpdateUser, response);
        });
    },

    /**
     *
     * @param request
     * @param response
     */
    loginUser: (request, response) => {
        const { email, password } = request.body;

        const queryValidateLogin =
            `SELECT * FROM login
             INNER JOIN profile_app ON login.id = profile_app.id
             WHERE login.login_user='${email}' AND login.password_user='${password}'`;

        connection.query(queryValidateLogin, (err, resultsLogin) => {
            if(err) throw err;
            if(resultsLogin.length > 0)
                Service.HTTP_CUSTOM_RESPONSE(200, 'json', resultsLogin, response);
            else
                Service.HTTP_CUSTOM_RESPONSE(404, 'send', resultsLogin, response);
        })
    },

    /**
     *
     * @param request
     * @param response
     */
    getUsers: (request, response) => {
        const queryGetUsers =
            `SELECT name_user
             FROM profile_app`;

        connection.query(queryGetUsers, (err, resultsGetUsers) => {
            if(err) throw err;
            if(resultsGetUsers.length > 0)
                Service.HTTP_CUSTOM_RESPONSE(200, 'json', resultsGetUsers, response);
            else
                Service.HTTP_CUSTOM_RESPONSE(404, 'send', resultsGetUsers, response);
        })
    }
}