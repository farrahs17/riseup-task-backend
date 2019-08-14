const mongoose = require("mongoose");

const Workshop = require("./Workshop");
const User = require("./User");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  text: {
    type: Array,
    required: true
  },
  workshopId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Workshop"
  }
});

module.exports = mongoose.model("Question", questionSchema);
