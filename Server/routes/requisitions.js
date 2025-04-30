const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // JWT middleware

const { verifyToken } = require('../middleware/authMiddleware');

const { createRequisition } = require('../controllers/requisitionController');
const { getMyRequisitions } = require('../controllers/requisitionController');

router.post('/', authenticate, createRequisition);
router.get('/my-requests', verifyToken, getMyRequisitions);

module.exports = router;
