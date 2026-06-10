const Pet = require("../models/Pet");
const Owner = require("../models/Owner");
const Veterinarian = require("../models/Veterinarian");
const {
  isValidObjectId,
  getErrorMessage,
  renderNotFound,
  renderServerError
} = require("./controllerHelpers");

const petPopulation = [
  { path: "eierId", select: "navn telefon adresse" },
  { path: "veterinaerId", select: "navn spesialisering telefon" }
];

async function getFormLists() {
  const [owners, veterinarians] = await Promise.all([
    Owner.find().sort({ navn: 1 }),
    Veterinarian.find().sort({ navn: 1 })
  ]);

  return { owners, veterinarians };
}

// Browser -> Express Route -> Controller -> MongoDB -> EJS Render -> Browser.
// Pets use ObjectId values because MongoDB documents each have a unique _id.
// eierId stores an owner's _id, and veterinaerId stores a veterinarian's _id.
// populate() follows those ObjectIds so the EJS view can display names instead
// of only database ids.
exports.index = async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate(petPopulation)
      .sort({ navn: 1 });

    res.status(200).render("pets/index", {
      title: "Pets",
      pets,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.createForm = async (req, res) => {
  try {
    if (req.session.user.role === "owner") {
      return res.redirect("/min-side/eier/kjaeledyr/ny");
    }

    const { owners, veterinarians } = await getFormLists();
    res.status(200).render("pets/create", {
      title: "Add pet",
      pet: {},
      owners,
      veterinarians,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.create = async (req, res) => {
  try {
    if (req.session.user.role === "owner") {
      return res.redirect("/min-side/eier/kjaeledyr/ny");
    }

    await Pet.create(req.body);
    res.redirect("/pets");
  } catch (error) {
    try {
      const { owners, veterinarians } = await getFormLists();
      res.status(400).render("pets/create", {
        title: "Add pet",
        pet: req.body,
        owners,
        veterinarians,
        error: getErrorMessage(error)
      });
    } catch (formError) {
      renderServerError(res, formError);
    }
  }
};

exports.editForm = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).render("error", {
        title: "Invalid id",
        message: "The pet id is not valid."
      });
    }

    const [pet, lists] = await Promise.all([
      Pet.findById(req.params.id),
      getFormLists()
    ]);

    if (!pet) {
      return renderNotFound(res, "Pet not found.");
    }

    res.status(200).render("pets/edit", {
      title: "Edit pet",
      pet,
      owners: lists.owners,
      veterinarians: lists.veterinarians,
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
        message: "The pet id is not valid."
      });
    }

    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!pet) {
      return renderNotFound(res, "Pet not found.");
    }

    res.redirect("/pets");
  } catch (error) {
    try {
      const { owners, veterinarians } = await getFormLists();
      res.status(400).render("pets/edit", {
        title: "Edit pet",
        pet: { _id: req.params.id, ...req.body },
        owners,
        veterinarians,
        error: getErrorMessage(error)
      });
    } catch (formError) {
      renderServerError(res, formError);
    }
  }
};

exports.remove = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).render("error", {
        title: "Invalid id",
        message: "The pet id is not valid."
      });
    }

    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return renderNotFound(res, "Pet not found.");
    }

    res.redirect("/pets");
  } catch (error) {
    renderServerError(res, error);
  }
};
