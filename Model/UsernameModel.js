const mongoose = require("mongoose");

const usernameSchema = new mongoose.Schema(
  {
    usernames: {
      type: String,
      required: [true, "Username is required"],
      unique: true, // Ensure unique index is created
    },
  },
  { timestamps: true }
);

// Creating the model
const Username = mongoose.model("Username", usernameSchema);

module.exports = Username;
