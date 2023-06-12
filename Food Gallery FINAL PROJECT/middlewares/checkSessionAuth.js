function checkSessionAuth(req, res, next) {
  //set variable for every pug file
  if (req.session.user) next();
  else return res.redirect("/login");
}

module.exports = checkSessionAuth;


//  user in session for later loged in 