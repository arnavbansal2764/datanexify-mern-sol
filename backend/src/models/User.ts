import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    googleId: string;
    accessToken: string;
}

const UserSchema: Schema = new Schema({
    googleId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
