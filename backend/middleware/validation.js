import { body, validationResult } from "express-validator";

// Validation rules middleware
export const validateSignup = [
  body("userName")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),

  body("email").isEmail().withMessage("Please enter a valid email address"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase character")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase character")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),

  // Middleware function to catch and send errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];


