const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    redirecturl: {
      type: String,
      required: true,
      trim: true,
    },
    visithistory: [
      {
        timestamp: { type: Number, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
