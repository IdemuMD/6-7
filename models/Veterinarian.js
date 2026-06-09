const mongoose = require("mongoose");

const veterinarianSchema = new mongoose.Schema(
  {
    navn: {
      type: String,
      required: true,
      trim: true
    },
    spesialisering: {
      type: String,
      required: true,
      trim: true
    },
    telefon: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    collection: "veterinaerer",
    timestamps: false
  }
);

module.exports = mongoose.model("Veterinarian", veterinarianSchema);
