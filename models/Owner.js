const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    navn: {
      type: String,
      required: true,
      trim: true
    },
    telefon: {
      type: String,
      required: true,
      trim: true
    },
    adresse: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    collection: "eiere",
    timestamps: false
  }
);

module.exports = mongoose.model("Owner", ownerSchema);
