import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'


const register = async (req, res) => {
    try {
        const { name, email, password, role ,status} = req.body;

        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            return res.status(401).json({ success: false, message: "User already exists" });
        }

        const newUser = new UserModel({
            name,
            email,
            password,
            role,
            status
        });

        await newUser.save();

        res.status(200).json({ message: "User registered successfully", newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
        console.log(error);
    }
};

const Login = async (req, res) => {
    try {
        const { email, password,status } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(404).json({ success: false, message: "Invalid credentials" });
        }
        if (user.status === 'inactive') {
            return res.status(403).json({ message: 'Account is inactive. Please contact admin.' });
          }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE || '81a785509ffc31a3878368d5850c492fbe48aed3617bd817b7c682d6b04a9c2a44adb5c16392ea0c4702b13265d7e00758ccf864cba308528b9b673f34925a95');

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        });
        res.status(200).json({ success: true, message: "Login successfully", user, token });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
        console.log(error);
    }
};



const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "user Logout successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" });
        console.log(error);
    }
};

const CheckUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
        console.log(error);
    }
};

export { register, Login, Logout, CheckUser };




















 