const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    firstname :{
        type: String,
        required: true,
        trim: true
      },
      lastname :{
        type: String,
        required: true,
        trim: true
      },
      email :{
        unique:true,
        type: String,
        required: true,
        trim: true
      },
      photoUrl :{
        type: String,
        trim: true
      },
      gender:{
        type:String,
        required:true,
      },
      dob:{
          type:String,
          required:true
      },
      addressline1:{
          type:String,
          required:true
      },
      addressline2:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    zip:{
        type:String,
        required:true,
    },
    phonenumber:{
        type:String,
        required:true
    },
    employeecode:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
    {
      timestamps: true,
});

const Employee = mongoose.model('Employee',employeeSchema)
module.exports = Employee