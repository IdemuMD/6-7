const Veterinarian = require("../models/Veterinarian");
const {
  isValidObjectId,
  getErrorMessage,
  renderNotFound,
  renderServerError
} = require("./controllerHelpers");

// Browser -> Express Route -> Controller -> MongoDB -> EJS Render -> Browser.
// EJS lets this project use normal server-rendered pages instead of React/Vue.
exports.index = async (req, res) => {
  try {
    const veterinarians = await Veterinarian.find().sort({ navn: 1 });
    res.status(200).render("veterinarians/index", {
      title: "Veterinarians",
      veterinarians,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.createForm = (req, res) => {
  res.status(200).render("veterinarians/create", {
    title: "Add veterinarian",
    veterinarian: {},
    error: null
  });
};

exports.create = async (req, res) => {
  try {
    await Veterinarian.create(req.body);
    res.redirect("/veterinarians");
  } catch (error) {
    res.status(400).render("veterinarians/create", {
      title: "Add veterinarian",
      veterinarian: req.body,
      error: getErrorMessage(error)
    });
  }
};

exports.editForm = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).render("error", {
        title: "Invalid id",
        message: "The veterinarian id is not valid."
      });
    }

    const veterinarian = await Veterinarian.findById(req.params.id);

    if (!veterinarian) {
      return renderNotFound(res, "Veterinarian not found.");
    }

    res.status(200).render("veterinarians/edit", {
      title: "Edit veterinarian",
      veterinarian,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).render("error", {
        title: "Invalid id",
        message: "The veterinarian id is not valid."
      });
    }

    const veterinarian = await Veterinarian.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!veterinarian) {
      return renderNotFound(res, "Veterinarian not found.");
    }

    res.redirect("/veterinarians");
  } catch (error) {
    res.status(400).render("veterinarians/edit", {
      title: "Edit veterinarian",
      veterinarian: { _id: req.params.id, ...req.body },
      error: getErrorMessage(error)
    });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).render("error", {
        title: "Invalid id",
        message: "The veterinarian id is not valid."
      });
    }

    const veterinarian = await Veterinarian.findByIdAndDelete(req.params.id);

    if (!veterinarian) {
      return renderNotFound(res, "Veterinarian not found.");
    }

    res.redirect("/veterinarians");
  } catch (error) {
    renderServerError(res, error);
  }
};
