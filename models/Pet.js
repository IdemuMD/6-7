const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    navn: {
      type: String,
      required: true,
      trim: true
    },
    art: {
      type: String,
      required: true,
      trim: true
    },
    rase: {
      type: String,
      required: true,
      trim: true
    },
    alder: {
      type: Number,
      required: true,
      min: 0
    },
    // ObjectId stores the _id from the eiere collection. Mongoose can then
    // populate eierId and render the full owner document in EJS.
    eierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true
    },
    // Keep this database field exactly as veterinaerId. Do not use æ here.
    veterinaerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
      required: true
    }
  },
  {
    collection: "kjaeledyr",
    timestamps: false
  }
);

module.exports = mongoose.model("Pet", petSchema);
