import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {jwtConfig} from "../config/jwt.js";

const registerUser = catchAsync(async (req, res, next) => {
    const { username, password, fullName, userRoleId } = req.body;

    // Check if username already exists
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
        return next(new AppError("Username already taken", 400));
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Save user
    const userId = await userModel.createUser({
        username,
        passwordHash,
        fullName,
        userRoleId: userRoleId || 1 // 1 = user by default
    });

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        userId
    });
});

const loginUser = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = await userModel.findUserByUsername(username);
    if (!user) {
        return next(new AppError("Invalid username or password", 401));
    }

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
        return next(new AppError("Invalid username or password", 401));
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user.id, role: user.user_role_id }, // payload
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );

    res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            fullName: user.full_name,
            role: user.user_role_id
        }
    });
});

const getUserProfile = catchAsync(async (req, res, next) => {
    const userId = req.user.id; // set by protect middleware

    const user = await userModel.findById(userId);

    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // delete password hash
    delete user.password_hash;

    res.status(200).json({
        success: true,
        data: user,
    });
});

export default {
    registerUser,
    loginUser,
    getUserProfile,
}
