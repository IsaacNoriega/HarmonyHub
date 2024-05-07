import express,{ Router } from "express";
import user from './users';
import authGoogle from './authGoogle';
import path from 'path';
import home from './home';
import project from './project';
import responseStatus from "../utils/response-status";


const router = Router();

router.use(express.json());
router.use(user);
router.use('/google', authGoogle);
router.use('/home', home);
router.use('/project', project);

router.get('', (req , res)=>{
    res.send('Api is working');
});

router.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'support.html'));
});

router.post('/logout' , ( req , res) => {
    const cookiesToDelete = ['username', 'token', 'tokenProject', 'email', 'connect.sid'];
    req.session.destroy( (err) =>{
        if(err){
            res.status(responseStatus.BAD_REQUEST).send(err);
        }else {
            cookiesToDelete.forEach(cookieName => {
                res.clearCookie(cookieName);
            });
            res.redirect('/login')
        }
    })
})

export default router;