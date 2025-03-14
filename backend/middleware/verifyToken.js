import  jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'

const isAdmin = async (req, res, next) => {
   try {
       const token = req.cookies.token;
       if (!token) {
           return res.status(401).json({ message: "Unauthorized: No token provided" });
       }

       const decoded = jwt.verify(token, process.env.JWT_SECRETE || '81a785509ffc31a3878368d5850c492fbe48aed3617bd817b7c682d6b04a9c2a44adb5c16392ea0c4702b13265d7e00758ccf864cba308528b9b673f34925a95');
       const user = await UserModel.findById(decoded.userId);
       if (!user) {
           return res.status(401).json({ message: "User not found" });
       }

       if (user.role !== "admin") {
           return res.status(403).json({ message: "Unauthorized: User is not an admin" });
       }
       req.user = user;
       next();
   } catch (error) {
       console.log(error);
   }
};

const IsUser = async (req, res, next) => {
   try {
       const token = req.cookies.token;
       if (!token) {
           return res.status(401).json({ message: "Unauthorized: No token provided" });
       }

       const decoded = jwt.verify(token, process.env.JWT_SECRETE || '81a785509ffc31a3878368d5850c492fbe48aed3617bd817b7c682d6b04a9c2a44adb5c16392ea0c4702b13265d7e00758ccf864cba308528b9b673f34925a95');
       const user = await UserModel.findById(decoded.userId);
       if (!user) {
           return res.status(401).json({ message: "User not found" });
       }

       req.user = user;
       next();
   } catch (error) {
       console.log(error);
   }
};

export { isAdmin, IsUser };

 