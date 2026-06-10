function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/auth/login");
    }

    if (req.session.user.role !== role) {
      return res.status(403).render("error", {
        title: "Ingen tilgang",
        message: "Du har ikke tilgang til denne siden."
      });
    }

    next();
  };
}

module.exports = {
  requireLogin,
  requireRole
};
