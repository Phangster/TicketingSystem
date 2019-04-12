const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId
  },
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
  ticketId: {
    type: Schema.Types.ObjectId, 
    ref:  "tickets"
  },
  subscribeTo: [
    {
      type: Schema.Types.ObjectId,
      ref: "tickets"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isEmailSent:{
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model("users", UserSchema);
