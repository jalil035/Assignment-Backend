import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    NIDNumber: { type: String, unique: true, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    bloodGroup: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("assignments", UserSchema);
export default UserModel;
