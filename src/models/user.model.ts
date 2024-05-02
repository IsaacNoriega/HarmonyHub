import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image : string;
    status: string;
    friends: string[];
}

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    image : { type : String,},
    status: { type: String, default: 'new' },
    friends: [{type: String}]
});

const User = model('User', userSchema);

export default User;

