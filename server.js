const {app,port} = require('./utils/admin')
const {
signup,
login,
getUsers,
getUser
} = require("./routes/users");


const {
    addEmployee,
    addEmploymentInfo,
    deleteEmployee,
    updateEmployeeInfo,
    updateEmployementInfo,
    getSalary,
    getEmployee,
    getEmployement
} = require('./routes/employee');
const {
verifyToken
} = require('./middleware/authJWT')

app.post('/api/user/signup',signup);
app.post('/api/user/login',login);
// app.post('/api/user/',[verifyToken],getUser);


//admin
app.get("/api/employee/all", [verifyToken], getUsers);
app.get("/api/employee/:employeecode", getEmployee);
app.get("/api/employement/:employeecode", getEmployement);
app.post('/api/admin/addemployee',[verifyToken],addEmployee)
app.post('/api/admin/:employeecode/addemployment',[verifyToken],addEmploymentInfo)
app.post('/api/admin/:employeecode/delete',[verifyToken],deleteEmployee)
app.post('/api/admin/:employeecode/updateemployee',[verifyToken],updateEmployeeInfo)
app.post('/api/admin/:employeecode/updateemployement',updateEmployementInfo)
app.post('/api/admin/:employeecode/calculate',[verifyToken],getSalary)
app.listen(port, ()=>{
    console.log(`server is now running on ${port}`);
})