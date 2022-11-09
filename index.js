const inquirer = require('inquirer');
const db = require('./config/connection');
require('console.table')
// require('dotenv').config();

// function WHEN I start the application
function init() {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all departments',
                    value: 'View all departments',
                },
                {
                    name: 'View all roles',
                    value: 'View all roles', 
                },
                {
                    name: 'View all employees',
                    value: 'View all employees',
                },
                {
                    name: 'Add a department',
                    value: 'Add a department',
                },
                {
                    name: 'Add a role',
                    value: 'Add a role',
                }, 
                {
                    name: 'Add an employee',
                    value: 'Add an employee'
                }, 
                {
                    name: 'Update an employee role',
                    value: 'Update an employee role'
                }
            ]
        }
    ])
    .then((answer) => {
    switch (answer.action) {
        case 'View all departments': 
        viewAllDepts();
        break;

        case 'View all roles': 
        viewAllRoles();
        break;

        case 'View all employees': 
        viewAllEmps();
        break;

        case 'Add a department': 
        addDept();
        break;

        case 'Add a role': 
        addRole();
        break;

        case 'Add an employee': 
        addEmp();
        break;

        case 'Update an employee role': 
        updateRole();
        break;

    default:
        process.exit()
    }
    })
    .catch((err) => console.log(err));
}
init();

// function WHEN I choose to view all departments
function viewAllDepts() {
    const sql = 'SELECT * FROM department';
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
};

// function WHEN I choose to view all roles
function viewAllRoles() {
    const sql = 'SELECT *, department.name FROM role JOIN department ON department.id = role.department_id'
    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
            init();
        })
        .catch(err => console.log(err));
}

// function WHEN I choose to view all employees
function viewAllEmps() {
    const sql = `SELECT emp.id, emp.first_name, emp.last_name,
                CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager 
                FROM employee emp
                LEFT JOIN employee mgr ON mgr.id = emp.manager_id
                LEFT JOIN role ON emp.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id;`;
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        console.table(rows);
        init();
    })
    .catch(err => console.log(err));
};

// function WHEN I choose to add a department
function addDept() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDept',
                message: 'Choose the name of the department.'
            }
        ])
        .then((answer) => {
            const sql = `INSERT INTO department (name)
                        VALUES ('${answer.newDept}')`;
            db.promise()
            .query(sql)
            .then(() => {
                console.log('New department added!');
    viewAllDepts();
            })
        })
        .catch(err => console.log(err));
};

function getDeptName() {
    let deptName = [];
    const sql = 'SELECT * FROM department';
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        rows.forEach((i) => deptName.push(i.name))
    addRole(deptName);
      })
};

// function WHEN I choose to add a role
function addRole(deptName) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newTitle',
                message: 'Enter the title.'
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'Enter the salary.'
            },
            {
                type: 'list',
                name: 'dept',
                message: 'Choose the department for this title.',
                choices: deptName
            },
        ])
        .then((answer) => {
            const sql = `INSERT INTO role (title, salary)`
        })

}
// function WHEN I choose to add an employee
// function WHEN I choose to update an employee role
