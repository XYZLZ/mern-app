import {Router} from 'express'
import {createConment, createReply, deleteConment, getConments, updateConment} from '../controllers/conment.controller.js';
import auth from '../middlewares/auth.js';


const router = Router();


router.get('/', auth, getConments);
router.post('/', auth, createConment);
router.post('/reply/:id', auth, createReply);
router.put('/:id', auth, updateConment);
router.delete('/:id', auth, deleteConment);


export default router;