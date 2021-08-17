const getConnection = require('./config/connection');
const express = require('express');
const app = express();
const inquirer = require('inquirer');

const { getQuery } = require('./orm');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/movies', (req, res) => {
    getQuery('SELECT * FROM movies;', req, res);
});

app.listen(PORT, () => console.log(`lsitening on port ${PORT}`));

async function loadMainPrompts() {
    const { choice } = await inquirer.prompt([
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
    ]);
}
loadMainPrompts();