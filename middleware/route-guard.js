function isLoggedIn(req, res, next) {
    if (req.session.user) {
      res.locals.isLoggedIn = true;
      next();
    } else {
      res.locals.isLoggedIn = false;
      next();
    }
  }
  
  function isLoggedOut(req, res, next) {
    if (req.session.user) {
      res.locals.isLoggedOut = false;
      next();
    } else {
      res.locals.isLoggedOut = true;
      next();
    }
  }
  
// // middleware/route-guard.js

// // checks if the user is logged in when trying to access a specific page
// const isLoggedIn = (req, res, next) => {
//     if (!req.session.user) {
//       return res.redirect('/login');
//     }
//     next();
//   };
  
//   // if an already logged in user tries to access the login page it
//   // redirects the user to the home page
//   const isLoggedOut = (req, res, next) => {
//     if (req.session.user) {
//       return res.redirect('/');
//     }
//     next();
//   };
  
  module.exports = {
    isLoggedIn,
    isLoggedOut
  };
  