const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const MacAddressValidation = require('../middlewares/MacaddressValidation');
const TaskModel = require('../model/TaskModel');
const MacaddressValidation = require('../middlewares/MacaddressValidation');

router.get('/filter/all/:macaddress', MacAddressValidation, TaskController.all);

router.get('/:id', TaskController.show);
router.put('/:id',TaskValidation, TaskController.update);
router.post('/', TaskValidation, TaskController.create);
router.delete('/:id', TaskController.delete);
router.put('/:id/:done', TaskController.done);

router.get('/filter/late/:macaddress', TaskController.late);
router.get('/filter/today/:macaddress', TaskController.today);
router.get('/filter/week/:macaddress', TaskController.week);
router.get('/filter/month/:macaddress', TaskController.month);
router.get('/filter/year/:macaddress', TaskController.year);

module.exports = router;