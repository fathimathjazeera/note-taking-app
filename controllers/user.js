import UserModel from "../models/user.js";
import { generateAccessToken } from "../utils/generateToken.js";
import { authSchema } from "../utils/validation.js";
export const register = async (req, res) => {
  const { error, value } = authSchema.validate(req.body);
  const { username, email, password } = value;
  const findUser = await users.findOne({ email: email });
  if (error) {
    res.status(422);
    res.json({
      status: "error",
      message: error.details[0].message,
    });
  }
  if (findUser) {
    res.status(400);
    res.json({
      status: "error",
      message: "User with this email already exists",
    });
  }
  const user = await UserModel.create({
    username: username,
    email: email,
    password: await bcrypt.hash(password, 10),
  });
  res.status(200);
  res.json({
    status: "success",
    message: "Successfully registered. Verification email sent.",
    data: user,
  });
};

// USER LOGIN
export const login = async (req, res) => {
  const { error, value } = authSchema.validate(req.body);
  if (!error) {
    const { email, password } = value;
    const registeredUser = await UserModel.findOne({ email: email });
    if (!registeredUser) {
      res.status(401).json({
        status: "failed",
        message: "User not found. Please register first.",
      });
    } else {
      bcrypt.compare(password, registeredUser.password).then((status) => {
        if (status) {
          let user = {
            id: registeredUser._id,
            username: registeredUser.username,
          };
          let token = generateAccessToken(user);
          res.status(200).json({
            auth: true,
            message: "successfully logged In",
            userId: user.id,
            token: token,
          });
        } else {
          res.status(401).json({
            status: "failed",
            message: "Incorrect password login failed",
          });
        }
      });
    }
  }
};
