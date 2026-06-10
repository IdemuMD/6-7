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
    },
    epost: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true
    },
    passordHash: {
      type: String,
      select: false
    }
  },
  {
    collection: "veterinaerer",
    timestamps: false
  }
);

module.exports = mongoose.model("Veterinarian", veterinarianSchema);
