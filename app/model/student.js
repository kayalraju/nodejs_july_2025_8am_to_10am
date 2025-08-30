const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StudentSchema = new Schema({
    name: {
        type: String,
        required: [true, "name filed is required"]
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    is_deleted: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    }


}, {
    timestamps: true
})

const StudentModel = mongoose.model('student', StudentSchema)

module.exports = StudentModel