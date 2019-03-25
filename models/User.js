const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
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
  contact: {
    type: String,
    required: true
  },
  tickets: 
    {
      // Can have more than 1 label
      // Status: New, Assigned, Archive
      type: Array,
      label: {
        type: Array
        // required: true
      },
      content: {
        type: String
        // required: true
      },
      status: {
        type: String
        // required: true
      }
    },
  date: {
    type: Date,
    default: Date.now
  },
  access: {
    type: String,
    default: "user"
  },
  isEmailSent:{
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
