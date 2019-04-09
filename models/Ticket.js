const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "new"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Tickets = mongoose.model("tickets", TicketSchema);
