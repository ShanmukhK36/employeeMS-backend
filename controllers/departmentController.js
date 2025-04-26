import Department from "../models/Department.js";

const addDepartment = async (req, res) => {
    try {
        const {department_name, description} = req.body;
        const newDepartment = new Department({
            department_name,
            description
        })
        await newDepartment.save()
        return res.status(200).json({success: true, department: newDepartment})
    } catch(error) {
        return res.status(500).json({success: false, error: "Add Department Server Error"})
    }
}

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    } catch(error) {
        return res.status(500).json({success: false, error: "Fetch Department Server Error"})
    }
}

const getDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById({_id: id}) 
        return res.status(200).json({success: true, department})
    } catch(error) {
        return res.status(500).json({success: false, error: "Get Department Server Error"})
    }
}

const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {department_name, description} = req.body;
        const update_department = await Department.findByIdAndUpdate({_id: id}, {
            department_name,
            description
        })
        return res.status(200).json({success: true, update_department})
    } catch(error) {
        return res.status(500).json({success: false, error: "Edit Department Server Error"})
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const delete_department = await Department.findById({_id: id})
        await delete_department.deleteOne()
        return res.status(200).json({success: true, delete_department})
    } catch(error) {
        return res.status(500).json({success: false, error: "Delete Department Server Error"})
    }
}

export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}