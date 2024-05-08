import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index'
import mongoose from 'mongoose';
import path from 'path';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../swagger.config.json';
import cookieParser from 'cookie-parser';
import http from 'http'; // Importa http para crear un servidor
import support from './controllers/support';
const cors = require('cors');

const port = process.env.PORT || 3000;
const db_url = process.env.URLDB || 'mongodb+srv://mateeldemoledor:hola123@cluster0.ztfvxtn.mongodb.net/HarmonyHub?retryWrites=true&w=majority';

const app = express();
const server = http.createServer(app); // Crea un servidor HTTP

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views','./src/views');

app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets',express.static(path.join(__dirname,'public')));
app.use(routes);

app.use(cors());


//Swagger
const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Socket
support(server);

console.log(db_url);
mongoose.connect(db_url).then(() => {
    server.listen(port, () => {
        if (process.env.NODE_ENV == 'dev') {
            console.log('App is running on port', port)
        } else {
            console.log('App running', port)
        }
    });
}).catch( e => {
    console.log('failed to connect to db ', e);
});
