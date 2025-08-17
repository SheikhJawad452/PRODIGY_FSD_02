require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const EmployeeRouter = require('./Routes/EmployeRoutes');
require('./Models/db');
const cors = require('cors');


const PORT = process.env.PORT  || 8080;

app.use(bodyParser.json())
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hey There')
});

app.use('/api/employees',EmployeeRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`)
});