const mongoose = require('mongoose');
require('dotenv').config(); 
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const employeSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    createdbyId:{
        type:Object
    },
    address:{
        type: String,
        required: true,
    },
    mobile:{
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true
    }
})

mongoose.connect(process.env.API_URL)
.then(e=>{
    console.log("Connected to DB");
})
.catch(e=>{
    console.log("Error ", e);
}) 
const USER = mongoose.model('user', userSchema);
const EMPLOYEE = mongoose.model('employee', employeSchema);
module.exports = { 
    USER,
    EMPLOYEE
}