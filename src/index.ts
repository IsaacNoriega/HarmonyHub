import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import routes from './routes/index'
import mongoose from 'mongoose';
import path from 'path';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../swagger.config.json';


const port = process.env.PORT || 3000;
const db_url = process.env.URLDB || 'mongodb+srv://mateeldemoledor:hola123@cluster0.ztfvxtn.mongodb.net/HarmonyHub?retryWrites=true&w=majority';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views','./src/views')

app.use('/assets',express.static(path.join(__dirname,'public')));
app.use(routes);


//Swagger
const swaggerDocs = swaggerJSDoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



console.log(db_url);
mongoose.connect(db_url).then(() => {
    app.listen(port , ()=>{
        if(process.env.NODE_ENV == 'dev'){
            console.log('App is running on port' , port)
        }else{
            console.log('App running',port)
        }
    })
}).catch( e => {
    console.log('failed to connect to db ', e);
});
