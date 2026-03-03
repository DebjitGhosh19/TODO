import User from "../models/user.model.js";
import  bcrypt from 'bcrypt'
import { generateTokenAndSaveCookies } from "../token/token.js";
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Require all fields" });
    }

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        message: "User alreadey exitst",
      });
    }
    //hash password 
    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User({ userName, email, password:hash });
    await newUser.save();
   
    if (newUser) {
      const token = await generateTokenAndSaveCookies(newUser._id,res)
      res.status(201).json({ message: "User created successfully", newUser ,token});
    }
  } catch (error) {
    res.status(400).json({ message: "Error occuring in Register user" });
  }
};

export const login = async (req, res) => {
   try {
     const {email,password}=req.body;
     if (!email||!password) {
      return   res.status(400).json({message:"Require all fields"})
     }
const user=await User.findOne({email})
console.log(user);
if (!user) {
   res.status(400).json({message:"Invalid credencial"})
}
const checkPassword=bcrypt.compareSync(password,user.password);
if (!checkPassword) {
    res.status(400).json({message:"Invalid credencial"})
}
res.status(200).json({message:"user login successfully",user,token})
   } catch (error) {
    res.status(400).json({message:"Error occuring in login"})
   }

};

export const logout = async (req, res) => {
   try {
res.clearCookie("jwt")
    res.status(200).json({message:"Logout successfully"})
   } catch (error) {
    res.status(400).json({message:"Error occuring in logout"})
   }

};
