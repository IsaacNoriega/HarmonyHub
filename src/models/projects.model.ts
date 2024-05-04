import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    projectName: string;
    userId: string;
    songs: { name: string, url: string }[];
    projectImage: string;
    collaborators: string[];
}

const userSchema = new Schema({
    projectName: { type: String, required: true },
    userId: { type: String, required: true },
    songs: [{
        name: { type: String, required: true },
        url : { type: String, required : true}
    }],
    projectImage : { type : String, required: false},
    collaborators: [{type: String, required: false}]
});

const User = model<IUser>('project', userSchema);

export default User;
