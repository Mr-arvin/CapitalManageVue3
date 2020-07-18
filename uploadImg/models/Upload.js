const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const UploadSchema = new Schema({
    type: {
        type: String
    },
    filepath: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Upload = mongoose.model('uploads', UploadSchema);