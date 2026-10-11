const express = require('express');
const router = express.Router();

const {
  getDoctors,
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');

const { authMiddleware, authorizeRole } = require('../middleware/authMiddleware');

// Route: /
// GET / - Public access to view available doctors
// POST / - Admin only to add a new doctor (401 if unauthenticated, 403 if unauthorized)
router
  .route('/')
  .get(getDoctors || getAllDoctors)
  .post(authMiddleware, authorizeRole('admin'), createDoctor);

// Route: /:id
// GET /:id - Public access to view a specific doctor profile
// PUT /:id, PATCH /:id - Admin only to modify doctor profile (401 if unauthenticated, 403 if unauthorized)
// DELETE /:id - Admin only to remove a doctor profile (401 if unauthenticated, 403 if unauthorized)
router
  .route('/:id')
  .get(getDoctorById)
  .put(authMiddleware, authorizeRole('admin'), updateDoctor)
  .patch(authMiddleware, authorizeRole('admin'), updateDoctor)
  .delete(authMiddleware, authorizeRole('admin'), deleteDoctor);

module.exports = router;
