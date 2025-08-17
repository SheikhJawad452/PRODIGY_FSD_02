const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
    try {
        const body = req.body;
        body.profileImage = req.file ? req.file?.path : null;
        const emp = new EmployeeModel(body);
        await emp.save();
        res.status(201)
            .json({
                message: 'Employee Created',
                success: true
            });

    } catch (err) {
        res.status(500).json({
            message: 'internal Server Error',
            success: false,
            error: err
        });
    }
}

const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEmp = await EmployeeModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEmp) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        res.status(200).json({ success: true, message: 'Employee updated', data: updatedEmp });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: err });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const { search = '', page = 1, limit = 5 } = req.query;
        const query = search
            ? { name: { $regex: search, $options: 'i' } }
            : {};

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const employees = await EmployeeModel.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        const totalEmployees = await EmployeeModel.countDocuments(query);
        const totalPages = Math.ceil(totalEmployees / limit);

        res.status(200).json({
            success: true,
            data: {
                employees,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    pageSize: parseInt(limit),
                    totalEmployees
                }
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err });
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findById(id); // <-- returns object
        if (!emp) {
            return res.status(404).json({
                message: 'Employee not found',
                success: false
            });
        }
        res.status(200)
            .json({
                message: 'Get Employee Detail',
                success: true,
                data: emp
            });
    } catch (err) {
        res.status(500).json({
            message: 'internal Server Error',
            success: false,
            error: err
        });
    }
}

const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findOneAndDelete({ _id: id });
        res.status(200)
            .json({
                message: 'Employee Deleted',
                success: true,
            });

    } catch (err) {
        res.status(500).json({
            message: 'internal Server Error',
            success: false,
            error: err
        });
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployeeById,
    updateEmployeeById
}
