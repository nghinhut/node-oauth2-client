var ClientOAuth2 = require('client-oauth2'); // https://github.com/mulesoft/js-client-oauth2

var vdatOAuth2 = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessTokenUri: process.env.OAUTH2_SERVER_URL + '/oauth2/token',
  // authorizationUri: process.env.OAUTH2_SERVER_URL + '/oauth2/token',
  // redirectUri: 'http://example.com/auth/github/callback',
  scopes: ['profile']
  // scopes: ['notifications', 'gist']
});

getToken = () => {
  return new Promise((resolve, reject) => {
    vdatOAuth2.createToken();
    vdatOAuth2.credentials.getToken()
      .then(function (ClientOAuth2Token) {
        // console.log(ClientOAuth2Token); //=> { accessToken: '...', tokenType: 'bearer', ... }
        // console.log(ClientOAuth2Token.tokenType);
        // console.log(ClientOAuth2Token.accessToken)

        resolve(ClientOAuth2Token.tokenType + ' ' + ClientOAuth2Token.accessToken);
      })
      .catch(reject)
  })
};

//Export
exports.getToken = getToken;

// Test
async function f() {
  const token = await getToken();
  console.log(token);
}

f();