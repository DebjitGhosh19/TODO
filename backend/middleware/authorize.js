import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const authenticate=async (req,res,next) => {
  const token=req.cookies.jwt;
  if (!token) {
    return res.status(401).json({message:"Unauthorized"})
  }
  try {
    const decoded=jwt.verify(token,process.env.Jwt_SecretKey);
      const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
     next();
  } catch (error) {
        return res.status(401).json({ message: "" + error.message });
  }
   
}