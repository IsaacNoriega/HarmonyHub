import { Router , Request, Response} from "express";
import authMiddlweare from '../middlewares/auth.middleware';
const router = Router();

router.get('', authMiddlweare, (req, res)=>{
    res.render('projects', { layout: 'sidebarmenu' });
});

router.get('', authMiddlweare, (req, res)=>{
    res.send('usuario autenticado por google');
});

router.get('/project', authMiddlweare, (req, res)=>{
    res.render('singleProject', { layout: 'sidebarmenu' });
});

export default router;