const Pet = require("../models/Pet");
const Veterinarian = require("../models/Veterinarian");
const { getErrorMessage, renderServerError } = require("./controllerHelpers");

const petPopulation = [
  { path: "eierId", select: "navn telefon adresse epost" },
  { path: "veterinaerId", select: "navn spesialisering telefon epost" }
];

exports.ownerDashboard = async (req, res) => {
  try {
    const pets = await Pet.find({ eierId: req.session.user.id })
      .populate(petPopulation)
      .sort({ navn: 1 });

    res.status(200).render("dashboard/owner", {
      title: "Min side",
      pets,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.ownerPetCreateForm = async (req, res) => {
  try {
    const veterinarians = await Veterinarian.find().sort({ navn: 1 });

    res.status(200).render("dashboard/ownerPetCreate", {
      title: "Legg til kjæledyr",
      pet: {},
      veterinarians,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};

exports.ownerPetCreate = async (req, res) => {
  try {
    await Pet.create({
      navn: req.body.navn,
      art: req.body.art,
      rase: req.body.rase,
      alder: req.body.alder,
      eierId: req.session.user.id,
      veterinaerId: req.body.veterinaerId
    });

    res.redirect("/min-side/eier");
  } catch (error) {
    try {
      const veterinarians = await Veterinarian.find().sort({ navn: 1 });

      res.status(400).render("dashboard/ownerPetCreate", {
        title: "Legg til kjæledyr",
        pet: req.body,
        veterinarians,
        error: getErrorMessage(error)
      });
    } catch (formError) {
      renderServerError(res, formError);
    }
  }
};

exports.veterinarianDashboard = async (req, res) => {
  try {
    const pets = await Pet.find({ veterinaerId: req.session.user.id })
      .populate(petPopulation)
      .sort({ navn: 1 });

    res.status(200).render("dashboard/veterinarian", {
      title: "Min side",
      pets,
      error: null
    });
  } catch (error) {
    renderServerError(res, error);
  }
};
