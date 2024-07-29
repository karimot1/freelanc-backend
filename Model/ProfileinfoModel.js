const mongoose = require("mongoose");

const ProfileinfoSchema = new mongoose.Schema({
    FirstName:{type:String,required:[true,"FirstName is Required"]},
        LastName:{type:String,required:[true,"LastName is Required"]},
        Email: {
            type: String,
            required:[true,"Email is required"],
            unique:true, 
            message:"Email already in use", 
        },
    JobType: {
        type: String,
        required: true,
        trim : true
    },
    Experience: {
        type: String,
        required: true,
    },
    Education: {
        type: String,
        required: true,
    },
    AboutMe: {
        type: String,
        required: true,
    },
    Salary: {
        type: Number,
        required: true,
    },
    JobImage: {
        type: String,
        required: true,
    },
    JobCategory: {
        type: String,
        required: true,
    },
    
}, {timestamps : true})

const ProfileModel = mongoose.model("postproject", ProfileinfoSchema);

module.exports =  ProfileModel;