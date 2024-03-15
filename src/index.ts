import express from 'express';
import routes from './routes/index'
import mongoose from 'mongoose';

const app = express();

const port = process.env.PORT || 3000;

app.use(routes);

const db_url = process.env.URLDB;
console.log(db_url);
async function connect() {
    try {
        await mongoose.connect(db_url);
        app.listen(port, () => {
            if (process.env.NODE_ENV == 'dev') {
                console.log('App is running in port ' + port)
            } else {
                console.log('App running ' + port);
            }

        });
    } catch (e) {
        console.log('failed to connect to db ', e);
    }
}

connect();