const { Router } = require('express');
const { toDoController } = require('../controllers/toDo.controller');

const router = Router();

router.post('/todo', toDoController.postToDo);
router.patch('/todo/:id', toDoController.patchToDo);
router.get('/todo', toDoController.getToDo);
router.delete('/todo/:id', toDoController.deleteToDo);

module.exports = router;