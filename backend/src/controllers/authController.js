
const Patient = require("../models/Patient");
const bcrypt = require("bcrypt");

const registerPatient = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password ||
      !phone?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingPatient = await Patient.findOne({
      email: normalizedEmail,
    });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: "A patient with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the patient
    const patient = await Patient.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone.trim(),
    });

    
    const patientResponse = patient.toObject();
    delete patientResponse.password;

    return res.status(201).json({
      success: true,
      message: "Patient registered successfully",
      data: patientResponse,
    });
  } catch (error) {
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A patient with this email already exists",
      });
    }

    console.error("Patient registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to register patient",
    });
  }
};

module.exports = { registerPatient };
