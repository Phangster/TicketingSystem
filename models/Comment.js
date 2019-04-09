const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
        // required: true
    },
    ticketId: {
        type: mongoose.Types.ObjectId,
        ref: "tickets"
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
