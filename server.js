// const getConnection = require('./config/connection');
// const express = require('express');
// const app = express();
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
// const connection = getConnection();


// const PORT = process.env.PORT || 3000;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    }
);

// connection.connect(function (err) {
//     if (err) throw err;
// })

// app.listen(PORT, () => console.log(`listening on port ${PORT}`));

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
        .then((data) => {
            console.log(data.choice)

            switch (data.choice) {
                case "View All Departments":
                    viewAllDepartments();
                    break;

                case 'View All Roles':
                    viewAllRoles()
                    break;

                case 'View All Employees':
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

                case 'Quit':
                    console.log('Signed out. Type "npm start" to run it again')
                    connection.end();
                    break;

                default:
                    break;
            };

        })

}
loadMainPrompts();



const viewAllDepartments = async () => {
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
        const query = 'SELECT * FROM roles';
        connection.query(query, (req, res) => {
            console.table(res);
            loadMainPrompts();
        })
    } catch (err) {
        res.json(err);
    }
}