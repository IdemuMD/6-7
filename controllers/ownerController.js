const Owner = require("../models/Owner");
const {
  isValidObjectId,
  getErrorMessage,
  renderNotFound,
  renderServerError
} = require("./controllerHelpers");

// Data flow for this MVC app:
// Browser sends a request -> Express route receives it -> controller runs
// Mongoose queries MongoDB -> controller renders an EJS view -> HTML is sent
// back to the browser. EJS replaces a frontend framework by creating the HTML
// on the server before the browser receives the page.
exports.index = async (req, res) => {
  try {
    const owners = await Owner.find().sort({ navn: 1 });
    res.status(200).render("owners/index", {
      title: "Owners",
      owners,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.createForm = (req, res) => {
  res.status(200).render("owners/create", {
    title: "Add owner",
    owner: {},
    error: null
  });
};

exports.create = async (req, res) => {
  try {
    await Owner.create(req.body);
    res.redirect("/owners");
  } catch (error) {
    res.status(400).render("owners/create", {
      title: "Add owner",
      owner: req.body,
      error: getErrorMessage(error)
    });
  }
};

exports.editForm = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).render("error", {
        title: "Invalid id",
        message: "The owner id is not valid."
      });
    }

    const owner = await Owner.findById(req.params.id);

    if (!owner) {
      return renderNotFound(res, "Owner not found.");
    }

    res.status(200).render("owners/edit", {
      title: "Edit owner",
      owner,
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
        message: "The owner id is not valid."
      });
    }

    const owner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!owner) {
      return renderNotFound(res, "Owner not found.");
    }

    res.redirect("/owners");
  } catch (error) {
    res.status(400).render("owners/edit", {
      title: "Edit owner",
      owner: { _id: req.params.id, ...req.body },
      error: getErrorMessage(error)
    });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).render("error", {
        title: "Invalid id",
        message: "The owner id is not valid."
      });
    }

    const owner = await Owner.findByIdAndDelete(req.params.id);

    if (!owner) {
      return renderNotFound(res, "Owner not found.");
    }

    res.redirect("/owners");
  } catch (error) {
    renderServerError(res, error);
  }
};
