const mongoose = require("mongoose");

const Workshop = require("./Workshop");
const User = require("./User");
const Question = require("./Question");

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  workshopId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Workshop"
  },
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Question"
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = mongoose.model("Answer", answerSchema);
