import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  startDate: { type: Date, required:true, default:Date.now},
  endDate:{type:Date,default:null},
  title: { type: String, required: true },         // Task title
  description: { type: String, required: true },   // Task description
  assignedMember: { type: String, required: true }, // Assigned member's name or ID
  priority: {type: String, required: true},
  status: {type: String, required:true, default:'In Progress'},
  completed:{type: Boolean, default:false}
},{
  timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;