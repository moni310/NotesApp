const express = require('express');
const noteCtrl = require('../controllers/notesController')
const router = express.Router();

router.post('/add', noteCtrl.addNotes);
router.delete('/delete/:id', noteCtrl.deleteNotes);
router.get('/', noteCtrl.fetchNotes);


module.exports = router;
