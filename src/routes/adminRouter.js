const express = require('express');
const router = express.Router();
const {adminController} = require('../controllers');
const {validateMiddleware, authMiddleware} = require('../middlewares');

const {validateTrain} = validateMiddleware;
const {validateAdmin} = authMiddleware;

router.post('/trains', validateAdmin, validateTrain, adminController.addTrain);
router.put('/trains/:id/seats', validateAdmin, adminController.updateSeats);

module.exports = router;