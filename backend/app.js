const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const secretKey = crypto.randomBytes(32).toString('hex');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
var url = process.env.url
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });

// For Admin
const admin = {
    username: 'admin',
    password: 'admin123'
}

// Define Employee schema
const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    location: String,
    salary: Number,
    username: String,
    password: String
});

const EmployeeModel = mongoose.model('Employee', employeeSchema);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    // Check if the token starts with 'Bearer'
    if (!tokenHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token format' });
    }

    // Extract the token from the 'Bearer' tokenHeader
    const token = tokenHeader.slice(7);

    jwt.verify(token, secretKey, (err, user) => {
        console.log('Received Token:', token);
    
        if (err) {
            console.error('Token Verification Error:', err);
            return res.status(403).json({ error: 'Forbidden' });
        }
    
        req.user = user;
        next();
    });
    
};


// Routes
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Secret Key:", secretKey)
    // Check for admin user
    if (username === admin.username && password === admin.password) {
        let payload = { username: admin.username, password: admin.password }
        let adminToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ token: adminToken, role: 'admin' });
    }

    // Check for normal user (replace this with your actual user authentication logic)
    try {
        const user = await EmployeeModel.findOne({ username, password });
        let payload = { username: user.username, password: user.password }
        if (user) {
            let userToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            return res.status(200).json({ token: userToken, role: 'user',id:user._id });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/employees', authenticateToken, async (req, res) => {
    try {
        const employees = await EmployeeModel.find({});
        res.json(employees);
    } catch (error) {
        console.error("Error fetching employee list:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const id = req.params.id; // Access the 'id' parameter using req.params
        const employee = await EmployeeModel.findOne({ _id: id });

        if (!employee) {
            // If no employee is found for the given id, return a 404 status
            return res.status(404).json({ error: 'Employee not found' });
        }

        else{
            res.json(employee)
        };
    } catch (error) {
        console.error("Error fetching employee:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



app.put('/employees/:id', authenticateToken, async (req, res) => {
    try {
        const { name, location, position, salary } = req.body;
        const updateObject = {};
        if (name) updateObject.name = name;
        if (location) updateObject.location = location;
        if (position) updateObject.position = position;
        if (salary) updateObject.salary = salary;

        const updatedEmployee = await EmployeeModel.findOneAndUpdate({}, { $set: updateObject }, { new: true });

        if (!updatedEmployee) {
            res.status(404).json({ error: "No employee found to update" });
        } else {
            res.json(updatedEmployee);
        }
    } catch (error) {
        console.error("Error updating employee:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/employees/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEmployee = await EmployeeModel.findOneAndDelete({ _id: id });
        if (!deletedEmployee) {
            res.status(404).json({ error: "Employee not found" });
        } else {
            res.json(deletedEmployee);
        }
    } catch (error) {
        console.error("Error deleting employee:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/employees', authenticateToken, async (req, res) => {
    const { name, position, location, salary, username, password } = req.body;
    try {
        const newEmployee = new EmployeeModel({ name, position, location, salary, username, password });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Failed to add employee:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/add', async (req, res) => {
    const { name, position, location, salary, username, password } = req.body;
    try {
        const newEmployee = new EmployeeModel({ name, position, location, salary, username, password });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Failed to add employee:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
