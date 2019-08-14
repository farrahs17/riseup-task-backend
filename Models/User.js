const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  answers: [
    {
      answerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Answer"
      },
      answer: {
        type: Schema.Types.String,
        required: true,
        ref: "Answer"
      },
      workshopId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Workshop"
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
