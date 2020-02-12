const users = require('../db/users');
const gapi = require('../services/gmail.js');

module.exports = (req, res, next) => {
  try {
    if ( !req.signedCookies.cookie || !req.signedCookies.cookie.user ) {
      res.sendStatus(401);
      
    } else {
      let user = req.signedCookies.cookie.user;
      users.getUser(user).then(rows => {
        let {access_token: accessToken, refresh_token: refreshToken} = rows[ 0 ];
        let token = gapi.getToken(accessToken, refreshToken);
        req.gmail = gapi.getGmail(token);
        next();
      });
    }
    
    
  } catch (error) {
    console.error(`FILE: auth.js auth() | ERROR: \n`, error);
    res.sendStatus(400);
  }
};

