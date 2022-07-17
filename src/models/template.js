const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const templateSchema = new Schema({
  fullname: String,
  contact: Number,
  address: String,
  objectives: String,
  exprience: [String],
  academic_qualification: String,
  hobbies: [String],
  skills: [String],
  project: String,
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}
});
module.exports = mongoose.model("Template", templateSchema);