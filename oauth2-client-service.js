const moment = require('moment');
const request = require('request');

let token;
let token_created_at;

exports.getToken = async function() {
    return new Promise((resolve, reject) => {

      // Check token expires time
      if (token && (moment.now() < token_created_at + token.expires_in * 1000)) {
        resolve(token.token_type + ' ' + token.access_token);
      } else {

        // If not valid then
        // Get new access token at /oauth2/token
        const options = {
          method: 'POST',
          uri: process.env.OAUTH2_SERVER_URL && (process.env.OAUTH2_SERVER_URL + '/oauth2/token'),
          headers: {
            authorization: `Basic ${Buffer(process.env.OAUTH2_CLIENT_ID + ':' + process.env.OAUTH2_CLIENT_SECRET).toString('base64')}`,
          },
          form: {
            grant_type: 'client_credentials'
          }
        };
      request(options, (error, response, body) => {
        if (error) {
          console.error(error);

          reject(error);
        } else {
          token_created_at = moment.now();
          token = JSON.parse(body);

          resolve(token.token_type + ' ' + token.access_token);
        }
      })
    }
  });
};
