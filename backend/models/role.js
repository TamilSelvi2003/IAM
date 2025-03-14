
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  routes: [{ type: String, default: [] }],
});


export default mongoose.model('Role', RoleSchema)

