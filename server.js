const getConnection = require('./config/connection');
const express = require('express');
const app = express();
const inquirer = require('inquirer');

const { getQuery } = require('./orm');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/company', (req, res) => {
    getQuery('SELECT * FROM movies;', req, res);
});

app.listen(PORT, () => console.log(`lsitening on port ${PORT}`));

loadMainPrompts = () => {
    
 inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Employees By Department",
                    "View All Employees By Manager",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "Update Employee Manager",
                    "View All Roles",
                    "Add Role",
                    "Remove Role",
                    "View All Departments",
                    "Add Department",
                    "Remove Department",
                    "Quit",
                ]
            }
        ])
        .then ((data) => {
            //console.log (data)
            
            switch (data.choice){
                case "View All Departments":
                viewEmployeesByDept()
                break;
        
                case 'view all roles':
                viewAllRoles()
                break;
        
                case 'view all employees':
                viewAllEmployees()
                break;
        
                case 'add a department':
                addDepartment()
                break;
        
                case 'add a role':
                addRole()
                break;
        
                case 'add an employee':
                addEmployee()
                break;
        
                case 'update an employee role':
                updateEmployeeRole()
                break;
        
                case 'exit menu':
                    console.log('Signed out. Type "npm start" to run it again')
                    connection.end();
                break;
                
                default:
                    break;
            }; //end of switch
            
            })
        
        // res.json(res);
    // if (err) {
    //     res.json(err);
    // }
}
loadMainPrompts();

function viewEmployeesByDept() {
    connection.query('SELECT * FROM department', function (err, res) {
        console.log('=======================')
        console.table(res)
    })
    console.log('=======================')
    loadMainPrompts();
};

const viewAllDepartments = () => {
    try {
        const query = 'SELECT * FROM department';
        connection.query(query, (req, res) => {
            
            console.table(res);
            loadMainPrompts();
        })
        
    } catch (err) {
        res.json(err);
    }
}

const viewAllEmployees = () => {
    try {
        const query = 'SELECT * FROM employee';
        connection.query(query, (req, res) => {
            console.table(res);
            loadMainPrompts();
        })
    } catch (err) {
        res.json(err);
    }
}

const viewAllRoles = () => {
    try {
        const query = 'SELECT * FROM role';
        connection.query(query, (req, res) => {
            console.table(res);
            loadMainPrompts();
        })
    } catch (err) {
        res.json(err);
    }
}