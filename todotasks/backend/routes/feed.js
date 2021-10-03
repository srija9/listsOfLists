const express = require('express');

const router = express.Router();

const feedController = require('../controllers/feed');

router.get('/', feedController.getLists);

router.post('/add-list', feedController.postCard);

router.post('/add-task/:cardId', feedController.postTask);

router.post('/update-list/:cardId', feedController.updateCard);

router.post('/update-task/:taskId', feedController.updateTask);

router.post('/delete-list/:cardId', feedController.deleteCard);

router.post('/delete-task/:cardId/:taskId', feedController.deleteTask);

module.exports = router;