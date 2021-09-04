// const getConnection = require('./config/connection');
// const express = require('express');
// const app = express();
const util = require('util');
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
connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw err;
})

// app.listen(PORT, () => console.log(`listening on port ${PORT}`));

loadMainPrompts = () => {

    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                // "View All Employees By Department",
                // "View All Employees By Manager",
                "Add Employee",
                // "Remove Employee",
                "Update Employee Role",
                // "Update Employee Manager",
                "View All Roles",
                "Add Role",
                // "Remove Role",
                "View All Departments",
                "Add Department",
                // "Remove Department",
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

                case 'Add Role':
                    addRole()
                    break;

                case 'Add Employee':
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
        const query = `SELECT 
        employee.id as emp_id, 
        employee.first_name, 
        employee.last_name, 
        roles.title, 
        department.dep_name, 
        roles.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN roles ON employee.role_id = roles.id
        LEFT JOIN department ON department.id = roles.department_id
        LEFT JOIN employee manager ON manager.id = employee.manager_id`;
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

async function addEmployee() {

    inquirer.prompt([

        {
            type: 'input',
            message: "What is the new employee's first name?",
            name: 'firstName',
        },
        {
            type: 'input',
            message: "What is the new employee's last name?",
            name: 'lastName',
        },
        {
            type: 'list',
            message: "What is the new employee's role id?",
            choices: await getRoleTitles(),
            name: 'roleName',
            loop: false,
        },
        {
            type: 'list',
            message: "What is the new employee manager's id?",
            choices:  await getManagers(),
            name: 'managerName',
            loop:false,
        }])
        .then(function (a) {
            const query = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)'
            connection.query(query, [a.firstName, a.lastName, a.roleName, a.managerName], (req, res) => {
                console.log('================')
                console.table(res);
            });
            loadMainPrompts();
        });

};

async function getRoleTitles() {
    const query2 = `
        SELECT role_id 
        FROM employee
    `;
    const rows = await connection.query(query2);
    return rows.map(row => row.role_id);
}

async function getDeptIds() {
    const query2 = `
        SELECT id 
        FROM department
    `;
    const rows = await connection.query(query2);
    return rows.map(row => row.id);
}

async function getManagers() {
    const query = `
        SELECT id 
        FROM employee
    `;
    const rows = await connection.query(query);
    console.log(rows)
    return rows.map(row => row.id);
}

async function addRole() {
    inquirer.prompt([

        {
            type: 'input',
            message: "What is the new role's name?",
            name: 'roleName',
        },
        {
            type: 'input',
            message: "What is the new role's salary?",
            name: 'roleSalary',
        },
        {
            type: 'list',
            message: "What is the new role's department ID?",
            choices: await getDeptIds(),
            name: 'departmentId',
        }])
        .then(function (b) {
            const query = 'INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)'
            connection.query(query, [b.roleName, b.roleSalary, b.departmentId], function (err, results) {
                console.log('=======================')
            });
            loadMainPrompts();
        });
};