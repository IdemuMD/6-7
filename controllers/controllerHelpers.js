const mongoose = require("mongoose");

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function getErrorMessage(error) {
  if (error && error.message) {
    return error.message;
  }

  return "Something went wrong.";
}

function renderNotFound(res, message) {
  return res.status(404).render("error", {
    title: "Not found",
    message
  });
}

function renderServerError(res, error) {
  return res.status(500).render("error", {
    title: "Server error",
    message: getErrorMessage(error)
  });
}

module.exports = {
  isValidObjectId,
  getErrorMessage,
  renderNotFound,
  renderServerError
};
