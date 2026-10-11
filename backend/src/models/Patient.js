
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {

    firstName :{
        type : String,
        trim : true,
    },

    lastName: {
        type : String,
        trim : true,
    },

    password :{
        type : String,
        select : false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },


    phone: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    address: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);
