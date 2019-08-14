const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workshopSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  questions: [
    {
      type: String,
      ref: "Question",
      required: true
    }
  ],
  usersRegistered: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      username: {
        type: Schema.Types.String,
        ref: "User"
      }
    }
  ]
});

module.exports = mongoose.model("Workshop", workshopSchema);
