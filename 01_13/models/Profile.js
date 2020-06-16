const mongoose = require("mongoose");
const { schema } = require("./User");
const Schema  = mongoose.Schema;

const ProfileSchema = new Schema({
    type: {
        type: String
    },
    describe: {
        type: String
    },
    incode: {
        type: String,
        required: true
    },
    exend: {
        type: String,
        required: true
    },
    cash: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);