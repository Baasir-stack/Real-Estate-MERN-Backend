const express = require('express');
const { createResidency, getAllResidencies, getResidency } = require('../controller/residencyController'); // Use require for importing controller functions

const router = express.Router();
const jwtCheck = require("../config/auth0Config")
const requireAuth = require('../middleware/requireAuth')


// Create new residency
router.post('/create', requireAuth,jwtCheck,createResidency);

// Get all residency
router.get('/allresd', getAllResidencies);

// Get specific residency
router.get('/:id', getResidency);

module.exports = router; // Export the router as residencyRoute
