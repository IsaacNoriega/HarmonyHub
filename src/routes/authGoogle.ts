import { Router , Request, Response} from "express";
import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth20';

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
    const email = req.user?.emails[0]?.value;
        // Guardar el email en una cookie
        if (email) {
            res.cookie('email', email, { httpOnly: true });
        }
    // Si la autenticación es exitosa, el usuario será redirigido a /home
    res.redirect('/home');
});




export default router;