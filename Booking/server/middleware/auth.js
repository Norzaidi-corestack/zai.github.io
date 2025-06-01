function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  req.flash('error', 'You need to log in first.');
  res.redirect('/login');
}

module.exports = { ensureAuthenticated };
