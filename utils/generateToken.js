import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
  try {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  } catch (err) {
    console.log(err.message);
  }
};
