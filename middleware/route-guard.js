function isLoggedIn(req, res, next) {
  if (req.session.user) {
    res.locals.isLoggedIn = true;
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
}

function isLoggedOut(req, res, next) {
  if (req.session.user) {
    res.locals.isLoggedOut = false;
  } else {
    res.locals.isLoggedOut = true;
  }
  next();
}

  
  module.exports = {
    isLoggedIn,
    isLoggedOut
  };
  