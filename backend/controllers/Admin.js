import UserModel from "../models/user.js";

const Getuser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
        console.log(error);
    }
};

const deletUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const checkAdmin = await UserModel.findById(userId);

        if (checkAdmin.role == "admin") {
            return res.status(409).json({ message: "you can not delete yourself" });
        }
        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ message: "user deleted successfully ", user });
    } catch (error) {
        res.status(500).json({ message: "internal server error" });
        console.log(error);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, role, password,status } = req.body;

        if (!name || !email || !role || !password || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new UserModel({ name, email, role, password ,status});
        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateuser = async (req, res) => {
    try {
        const { name, email, role, password,status } = req.body;
        const userId = req.params.id;

        let updatedFields = { name, email, role, password,status };

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export { Getuser, deletUser, createUser, updateuser };



















 