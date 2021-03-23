import { Document, Schema, model } from "mongoose";

interface UserModel extends Document {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    required: true,
  },
});

export default model<UserModel>("User", UserSchema);
