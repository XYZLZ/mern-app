import {Router} from 'express'
import { createUser, deleteUser, getAllUsers, updateUsers, userLogin, userLogout, userLogoutAll, getOneUser, getAvatarUser, userConfirm, userPostLikes, getLikes } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const router = Router();



router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/signIn')
router.post('/login', userLogin);
router.get('/likes/:id', auth, getLikes);
router.post('/likes/:id', auth, userPostLikes);
router.post('/logout', auth, userLogout);
router.post('/logoutAll', auth, userLogoutAll);
router.get('/verify/:token', userConfirm)
router.get('/:id',auth, getOneUser);
router.get('/avatar/:id',auth, getAvatarUser);
router.put('/:id', auth, updateUsers);
router.delete('/:id', auth, deleteUser);


export default router;