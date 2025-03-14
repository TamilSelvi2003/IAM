 import express from 'express'
import { Getuser, deletUser, createUser, updateuser} from '../controllers/Admin.js'
import { isAdmin } from '../middleware/verifyToken.js'



const AdminRoutes=express.Router()
 AdminRoutes.get('/getuser',isAdmin,Getuser)
 AdminRoutes.delete('/delet/:id',isAdmin,deletUser)
 AdminRoutes.post("/createuser", isAdmin, createUser); 
 AdminRoutes.put("/updateuser/:id", isAdmin, updateuser);
//  AdminRoutes.put("/update-status", isAdmin, updateUserStatus);


export default AdminRoutes


