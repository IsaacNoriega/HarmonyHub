import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    projectName: string;
    userId: string;
    songs: string[];
    projectImage : string;
    collaborators: string[];
}

const userSchema = new Schema({
    projectName: { type: String, required: true },
    userId: { type: String, required: true },
    songs: [{type: String, required: false }],
    ProjectImage : { type : String, required: false},
    collaborators: [{type: String, required: false}]
});

const User = model('project', userSchema);

export default User;