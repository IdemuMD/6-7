const bcrypt = require("bcryptjs");
const Owner = require("../models/Owner");
const Veterinarian = require("../models/Veterinarian");
const { getErrorMessage, renderServerError } = require("./controllerHelpers");

function getModelByRole(role) {
  if (role === "owner") {
    return Owner;
  }

  if (role === "veterinarian") {
    return Veterinarian;
  }

  return null;
}

function getRedirectForRole(role) {
  if (role === "veterinarian") {
    return "/min-side/veterinaer";
  }

  return "/min-side/eier";
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

exports.loginForm = (req, res) => {
  res.status(200).render("auth/login", {
    title: "Logg inn",
    role: req.query.role || "owner",
    form: {},
    error: null
  });
};

exports.login = async (req, res) => {
  const role = req.body.role;
  const Model = getModelByRole(role);
  const epost = normalizeEmail(req.body.epost);

  try {
    if (!Model || !epost || !req.body.passord) {
      return res.status(400).render("auth/login", {
        title: "Logg inn",
        role: role || "owner",
        form: req.body,
        error: "Fyll inn e-post, passord og brukertype."
      });
    }

    const user = await Model.findOne({ epost }).select("+passordHash");
    const isMatch = user && user.passordHash
      ? await bcrypt.compare(req.body.passord, user.passordHash)
      : false;

    if (!isMatch) {
      return res.status(400).render("auth/login", {
        title: "Logg inn",
        role,
        form: req.body,
        error: "Feil e-post eller passord."
      });
    }

    req.session.user = {
      id: user._id.toString(),
      role,
      navn: user.navn,
      epost: user.epost
    };

    res.redirect(getRedirectForRole(role));
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.registerForm = (req, res) => {
  res.status(200).render("auth/register", {
    title: "Ny bruker",
    role: req.query.role || "owner",
    form: {},
    error: null
  });
};

exports.register = async (req, res) => {
  const role = req.body.role;
  const Model = getModelByRole(role);
  const epost = normalizeEmail(req.body.epost);

  try {
    if (!Model || !epost || !req.body.passord || !req.body.navn || !req.body.telefon) {
      return res.status(400).render("auth/register", {
        title: "Ny bruker",
        role: role || "owner",
        form: req.body,
        error: "Fyll inn alle påkrevde felt."
      });
    }

    if (role === "owner" && !req.body.adresse) {
      return res.status(400).render("auth/register", {
        title: "Ny bruker",
        role,
        form: req.body,
        error: "Eiere må ha adresse."
      });
    }

    if (role === "veterinarian" && !req.body.spesialisering) {
      return res.status(400).render("auth/register", {
        title: "Ny bruker",
        role,
        form: req.body,
        error: "Veterinærer må ha spesialisering."
      });
    }

    const existingUser = await Model.findOne({ epost });

    if (existingUser) {
      return res.status(400).render("auth/register", {
        title: "Ny bruker",
        role,
        form: req.body,
        error: "Det finnes allerede en bruker med denne e-posten."
      });
    }

    const passordHash = await bcrypt.hash(req.body.passord, 10);
    const userData = {
      navn: req.body.navn,
      telefon: req.body.telefon,
      epost,
      passordHash
    };

    if (role === "owner") {
      userData.adresse = req.body.adresse;
    } else {
      userData.spesialisering = req.body.spesialisering;
    }

    const user = await Model.create(userData);

    req.session.user = {
      id: user._id.toString(),
      role,
      navn: user.navn,
      epost: user.epost
    };

    res.redirect(getRedirectForRole(role));
  } catch (error) {
    res.status(400).render("auth/register", {
      title: "Ny bruker",
      role: role || "owner",
      form: req.body,
      error: getErrorMessage(error)
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
