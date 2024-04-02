import UserModel from "../models/user";
import { generateAccessToken } from "../utils/generateToken";


export const register = async (req, res) => {
    const { error, value } = authSchema.validate(req.body);
    const { username, email, password } = value;
    const findUser = await users.findOne({ email: email });
  
    if (error) {
    res.status(422)
      res.json({
        status: "error",
        message: error.details[0].message,
      });
    }
  
    if (findUser) {
      res.status(400)
      res.json({
        status: "error",
        message: "User with this email already exists",
      });
    }
  
    try {
      const user = await UserModel.create({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10),
        emailToken: crypto.randomBytes(64).toString("hex"),
      });
  
      console.log(user, "from user")
      res.status(200)
     res.json({
        status: "success",
        message: "Successfully registered. Verification email sent.",
      });
    } catch (error) {
      console.error("Error registering user:", error);
     res.status(500)
      res.json({
        status: "error",
        message: "Failed to register user. Please try again later.",
      });
    }
  };
  
  
  // USER LOGIN
 export const login = async (req, res) => {
    const { error, value } = authSchema.validate(req.body);
    if (!error) {
      const { email ,password} = value;
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
  } 
  