import dotenv from 'dotenv'
import express from 'express';
import routes from './routes/index'
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 3000;
const db_url = process.env.URLDB;

const app = express();
app.use(routes);

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
