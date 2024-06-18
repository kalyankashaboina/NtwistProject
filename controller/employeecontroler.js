const employee = require("../model/employee");
const Employee = require("../model/employee");

const createEmployee = async (req, res) => {
  try {
    // CREATING OR INSERTING DATA TO MANGO

    const { firstName,lastName,email, position, department, salary, dateofHire  } = req.body;
    const employee = new Employee({
      firstName,lastName,
      position,
      department,
      salary,
      email,
      dateofHire,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.log("message", err);
    res.status(500).json({ message: "server error" });
  }
};

// GEtting all DATA

const getAllEmployes = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(201).json(employees);
  } catch (err) {
    console.log("we got error", err);
    res.status(500).json({ message: "error in getting data" });
  }
};

// GETTING SINGLE DATA

const singleEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.log("server error", err);
    res.status(500).json({ message: "error getting single data" });
  }
};

// Upadating Data

const updateEmployee = async (req, res) => {
  try {
    const { firstName,lastName,email, position, department, salary, dateofHire } = req.body;

    const employee = await Employee.findByIdAndUpdate(req.params.id, {
      firstName,lastName,
      position,
      department,
      salary,
      dateofHire,
    });
    if (!employee) {
      return res.status(404).json({ mesage: "user not found" });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.log("server error", err);
    res.status(500).json({ message: "server error uodating data" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { firstName,lastName } = req.body;

    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "employee not found" });
    }
    res.status(201).json(employee);
  } catch (err) {
    console.log("server error", err);
    res.status(500).json({ message: "server error deleting data" });
  }
};

module.exports = {
  createEmployee,
  getAllEmployes,
  singleEmployee,
  updateEmployee,
  deleteEmployee,
};
