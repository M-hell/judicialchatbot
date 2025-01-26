const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide name"],
    },
    email: {
      type: String,
      required: [true, "provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "provide password"],
    },
    nationality: {
      type: String,
      required: [true, "provide nationality"],
    },
    sex: {
      type: String,
      required: [true, "provide sex"],
    },
    cases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",    
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
