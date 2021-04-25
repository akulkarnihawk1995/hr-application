const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const employmentSchema = new Schema({
    employeecode:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    division:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    joining_date:{
        type:String,
        required:true
    },
   visa_status:{
    type:String,
    required:true
   },
   working_hours:{
    type:String,
    required:true
   }
},
    {
      timestamps: true,
});

const Employement = mongoose.model('Employment',employmentSchema)
module.exports = Employement