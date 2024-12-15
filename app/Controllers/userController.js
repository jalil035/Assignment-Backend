import UserModel from "../Model/userModel.js";
import { EncodeToken, DecodeToken } from "../Utility/tokenUtility.js";

//User Registration
export const registration = async (req, res) => {
  try {
    let reqBody = req.body;
    await UserModel.create(reqBody);
    return res.json({
      status: "Success",
      Message: "User Registration Successfully",
    });
  } catch (err) {
    return res.json({ status: "failed", Message: err.toString() });
  }
};

// User Login
export const Login = async (req, res) => {
  try {
    let { NIDNumber, password } = req.body;
    let user = await UserModel.findOne({ NIDNumber: NIDNumber });
    if (!user || user.password !== password) {
      return res.json({ status: "Error", Message: "Invalid User" });
    } else {
      let token = EncodeToken(user._id, user.NIDNumber);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({
        status: "Success",
        Token: token,
        Message: "User Login Successfully",
      });
    }
  } catch (err) {
    return res.json({ status: "Error", Message: err.toString() });
  }
};

//User Profile Read
export const profileDetails = async (req, res) => {
  try {
    let NIDNumber = req.headers["NIDNumber"];

    console.log(NIDNumber);

    let user = await UserModel.findOne({ NIDNumber: NIDNumber });
    return res.json({
      status: "Success",
      Message: "User Profile Details Successfully",
      data: user,
    });
  } catch (err) {
    return res.json({ status: "Error", Message: err.toString() });
  }
};

//All User Profile Read
export const allUser = async (req, res) => {
  try {
    let users = await UserModel.find({});
    if (!users) {
      return res
        .status(404)
        .json({ status: "Error", Message: "No User Found" });
    }
    return res.json({
      status: "Success",
      Message: "All User Profile Details Successfully",
      data: users,
    });
  } catch (err) {
    return res.json({ status: "Error", Message: err.toString() });
  }
};

//User Profile Update
export const profileUpdate = async (req, res) => {
  try {
    let userUpdate = req.body;
    let user_id = req.headers["user_id"];
    await UserModel.updateOne({ _id: user_id }, userUpdate);
    return res.json({
      status: "Success",
      Message: "User Profile Update Successfully",
    });
  } catch (err) {
    return res.json({ status: "Error", Message: err.toString() });
  }
};

//Delete Single User
export const deleteSingleUser = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    await UserModel.deleteOne({ _id: user_id });
    return res.json({
      status: "Success",
      Message: "User deleted Successfully",
    });
  } catch (err) {
    return res.json({ status: "Error", Message: err.toString() });
  }
};
