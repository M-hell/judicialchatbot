const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "provide name"],
  },
  description: {
    type: String,
    required: [true, "provide description"],
  },
  initialResponse: {
    type: String,
  },
  hearings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hearing",
    },
  ],
  status: {
    type: String,
    required: [true, "provide status"],
  },
  startdate: {
    type: String,
  },
  enddate: {
    type: String,
  },
  summary: {
    type: String,
  },

  timestamps: true,
});

const CaseModel = mongoose.model("Case", caseSchema);

module.exports = CaseModel;
