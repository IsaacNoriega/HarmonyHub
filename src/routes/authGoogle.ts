import { Router , Request, Response} from "express";
import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import User from "../models/user.model";
import response from "../utils/response";
import ResponseStatus from '../utils/response-status';

const router = Router();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accesToken, refreshToken, profile, cb){
    return cb(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

router.get('', (req,res)=>{
    passport.authenticate('google',{
        scope:['profile','email']
    })(req, res); // Llamar a la función de autenticación aquí
});


router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req : any, res) => {
    const googleEmail = req.user?.emails[0]?.value;
    const googleName = req?.user?.displayName;
    const dataToken = {
        name: googleName,
        email: googleEmail,
    }
    User.findOne({
        email: googleEmail
    }).then(response =>{
        if(response){
            console.log('Usuario ya existe en la base de datos');
        }
        else{
            User.create(dataToken).then(response =>{
                console.log('Usuario: ',dataToken," Agregado a la base de datos");
            });
        }
    }).catch(e =>{
        res.sendStatus(ResponseStatus.BAD_REQUEST);
    })
    const token = jwt.sign(dataToken, process.env.TOKEN_KEY);
    res.redirect('/home?t='+token);
});




export default router;