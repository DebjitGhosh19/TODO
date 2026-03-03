import expresss from 'express'
import { login, logout, register } from '../controllers/user.controller.js';
import { validateSignup } from '../middleware/validation.js';

const userRouter=expresss.Router();

userRouter.post("/signup", validateSignup,register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)

export default userRouter