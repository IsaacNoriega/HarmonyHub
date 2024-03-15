import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/signup", (req, res) => {
    res.render('register');

});

router.post('/signup', userController.signUp);



export default router;
