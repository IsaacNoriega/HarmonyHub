import express,{ Router } from "express";
import user from './users';
import authGoogle from './authGoogle'


const router = Router();

router.use(express.json());
router.use(user);
router.use('/google', authGoogle);

router.get('', (req , res)=>{
    res.send('Api is working');
});

export default router;