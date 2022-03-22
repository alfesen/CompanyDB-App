const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll);

router.get('/employees/random', EmployeesController.getRandom);

router.get('/employees/:id', EmployeesController.getById);

router.post('/employees', EmployeesController.postEmp);

router.put('/employees/:id', EmployeesController.updateEmp);

router.delete('/employees/:id', EmployeesController.deleteEmp);

module.exports = router;