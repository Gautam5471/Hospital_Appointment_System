const express = require('express');
const router = express.Router();

const {
  getAllPatients,
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

const { authMiddleware, authorizeRole } = require('../middleware/authMiddleware');

// Protect all patient routes with JWT authentication (401 if unauthenticated)
router.use(authMiddleware);

// GET / - Restrict to 'admin' and 'doctor' roles (403 if unauthorized)
// POST / - Allow authenticated access
router
  .route('/')
  .get(authorizeRole('admin', 'doctor'), getAllPatients || getPatients)
  .post(createPatient);

// GET /:id, PUT /:id - Allow authenticated access
// DELETE /:id - Restrict strictly to 'admin' role (403 if unauthorized)
router
  .route('/:id')
  .get(getPatientById)
  .put(updatePatient)
  .delete(authorizeRole('admin'), deletePatient);

module.exports = router;