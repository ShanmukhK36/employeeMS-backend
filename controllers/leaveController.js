import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"

const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason} = req.body
        const employee = await Employee.findOne({userId: userId})
        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        })
        await newLeave.save()
        return res.status(200).json({success: true, message: "Leave Request Successfull"})
    } catch(error) {
        return res.status(500).json({success: false, error: "Server Error in Leave Request"})
    }
}

const getLeaves = async (req, res) => {
    try {
        const {id} = req.params;
        let employee;
        employee= await Employee.findOne({userId: id})
        if(!employee) {
            employee= await Employee.findOne({_id: id})
        }
        const leaves= await Leave.find({employeeId: employee._id})
        return res.status(200).json({success: true, leaves})
    } catch(error) {
        return res.status(500).json({success: false, error: "Server Error in Fetch Leave Request List"})
    }
}

const updateLeave = async (req, res) => {
    try {
        const {id} = req.params;
        const updateLeave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!updateLeave) {
            return res.status(404).json({success: false, error: "Document Not Found"})
        }
        return res.status(200).json({success: true, updateLeave})
    } catch(error) {
        return res.status(500).json({success: false, error: "Update Leave Status Server Error"})
    }
}

const getLeavesForAction = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: 'employeeId',
            populate: [
                {path: 'department',
                    select: 'department_name'
                },
                {path: 'userId',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json({success: true, leaves})
    } catch(error) {
        return res.status(500).json({success: false, error: "Fetch Leaves Server Error"})
    }
}

const getLeaveDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: 'employeeId',
            populate: [
                {path: 'department',
                    select: 'department_name'
                },
                {path: 'userId',
                    select: 'name profileImage'
                }
            ]
        })
        return res.status(200).json({success: true, leave})
    } catch(error) {
        return res.status(500).json({success: false, error: "Fetch Leave Details Server Error"})
    }
}

export {addLeave, getLeaves, getLeavesForAction, getLeaveDetails, updateLeave}