import { Router } from "express";
import userController from "../controllers/user.controller";
import hashPassword from "../utils/hash-password";
const router = Router();


router.get("/signup", (req, res) => {
    res.render('register');

});

router.get("/login", (req, res) => {
    res.render('login');

});



router.post('/signup', userController.signUp);
router.post('/login', userController.login);



export default router;
