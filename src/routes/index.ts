import express,{ Router } from "express";
import user from './users';

const router = Router();

router.use(express.json());
router.use(user);

router.get('', (req , res)=>{
    res.send('Api is working');
});

export default router;