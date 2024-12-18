const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Use uppercase "Schema" from mongoose

const studentSchema = new Schema({
    name: {
        type: String,
        required: true // Fixed spelling for "required"
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
