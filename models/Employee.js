import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    employeeId: {type: String, required: true, unique: true},
    dob: {type: Date},
    gender: {type: String},
    designation: {type: String},
    department: {type: Schema.Types.ObjectId, ref: "Department", required: true},
    salary: {type: Number, required: true},
    maritalStatus: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Employee = mongoose.model("Employee", employeeSchema)
export default Employee;