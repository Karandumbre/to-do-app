const express = require('express');
const router = express.Router();

const ctrlTodo = require('./../controller/todo.controller');

router.get('/:field/:order',ctrlTodo.getData)
router.get('/:id',ctrlTodo.getTodoBasedOnId)
router.post('/search',ctrlTodo.search)
router.post('/add',ctrlTodo.addTodo)
router.post('/update/:id',ctrlTodo.updateTodo)
router.delete('/delete/:id',ctrlTodo.deleteTodo)

module.exports = router;