const express = require('express');
const MentorController = require('../controllers/mentor.controller');

// get an instance of express router
const router = express();
router.get('/', MentorController.getMentors);

router.post('/', MentorController.addMentor);

router.get('/:id', MentorController.getMentor);
router.put('/:id', MentorController.updateMentor);
router.delete('/:id', MentorController.deleteMentor);

module.exports = router;
