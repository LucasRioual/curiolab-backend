const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuffCtrl');


router.post('/', stuffCtrl.createStuff);
router.get('/', stuffCtrl.getAllStuff);
router.get('/:id', stuffCtrl.getOneStuff);
router.put('/:id', stuffCtrl.modifyStuff);
router.delete('/:id', stuffCtrl.deleteStuff);





module.exports = router;