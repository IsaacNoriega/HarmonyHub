import express,{ Router } from "express";
import user from './users';
import authGoogle from './authGoogle';
import path from 'path';
import home from './home';


const router = Router();

router.use(express.json());
router.use(user);
router.use('/google', authGoogle);
router.use('/home', home);

router.get('', (req , res)=>{
    res.send('Api is working');
});

router.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'support.html'));
});

export default router;