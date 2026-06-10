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
    collection: "eiere",
    timestamps: false
  }
);

module.exports = mongoose.model("Owner", ownerSchema);
