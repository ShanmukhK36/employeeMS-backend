import Employee from "../models/Employee.js"
import Salary from "../models/Salary.js"

const addSalary = async (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate,
        })
        await newSalary.save()
        return res.status(200).json({success: true, message: "Salary Credited Successfully"})
    } catch(error) {
        return res.status(500).json({success: false, error: "Server Error in Add Salary"})
    }
}

const getSalary = async(req, res) => {
    try {
        let salary;
        const {id, role} = req.params;
        if(role === 'admin') {
            salary= await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
        } else {
            const employee = await Employee.findOne({userId: id}).populate('employeeId', 'employeeId')
            salary= await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
        }
        return res.status(200).json({success: true, salary})
    } catch(error) {
        return res.status(500).json({success: false, error: "Server Error in Fetching Salary"})
    }
}

export {addSalary, getSalary}