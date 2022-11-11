const inquirer = require('inquirer');
const db = require('./config/connection.js');
const table = require('console.table');

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
                },
                {
                    name: 'Quit',
                    value: 'Quit'
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
    })
    .then(() => init());
};

// function WHEN I choose to view all roles
function viewAllRoles() {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary 
                FROM role
                LEFT JOIN department on role.department_id = department.id;`;
    db.promise()
        .query(sql)
        .then(([rows, _]) => {
            console.table(rows);
        })
        .then(() => init());
}

// function WHEN I choose to view all employees
function viewAllEmps() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                ORDER BY employee.id;`;
    db.promise()
      .query(sql)
      .then(([rows, _]) => {
        console.table(rows);
    })
    .then(() => init());
};

// Set up arrays
let managerArray = [];
function selectManager() {
    const sql = "SELECT first_name, last_name FROM employee"
    db.query(sql, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;
};

let departmentArray = [];
function selectDepartment() {
    const sql = "SELECT * FROM department"
    db.query(sql, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            departmentArray.push(res[i].name);
        }
    })
    return departmentArray; 
};

let roleArray = [];
function selectRole() {
    const sql = "SELECT * FROM role"
    db.query(sql, function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
};

// function WHEN I choose to add a department
function addDept() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Enter the name of the new department."
            },
            {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the new department.',
            }
        ]).then(function(answers) {
            const sql = 'INSERT INTO department SET ?';
            db.query(sql, 
                {
                    name: answers.name,
                    id: answers.id
                },
                function(err, res) {
                    if (err) throw err
                    console.table(res);
                    init();
                }
            )            
        })
};

// function WHEN I choose to add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title.'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary.'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Choose the department for this title.',
                choices: selectDepartment()
            }
        ])
        .then(function(answers) {
            var departmentID = selectDepartment().indexOf(answers.choice) + 1
            db.query("INSERT INTO role SET ?",
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: departmentID
                },
                function(err, answers) {
                    if (err) throw err
                    console.table(answers);
                    init();
                }
            )
        })   
    };


// function WHEN I choose to add an employee
function addEmp() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstname",
                message: "Enter employee first name."
            },
            {
                type: "input",
                name: "lastname",
                message: "Enter employee last name."
            },
            {
                type: "list",
                name: "role",
                message: "What is the new employee's role?",
                choices: selectRole()
            },
            {
                type: "list",
                name: "manager",
                message: "Who is this employee's manager?",
                choices: selectManager()
            }
        ]).then(function (answers) {
            let roleId = selectRole().indexOf(answers.role) + 1
            let managerId = selectManager().indexOf(answers.manager) + 1
            db.query("INSERT INTO employee SET ?", 
                {
                    first_name: answers.firstname,
                    last_name: answers.lastname,
                    manager_id: managerId,
                    role_id: roleId
                },
                function(err, answers) {
                    if (err) throw err
                    console.table(answers)
                    init()
                }
            )
        })
};

// function WHEN I choose to update an employee role
function updateRole() {
    const sql = "SELECT first_name, last_name, id FROM employee";
    db.query(sql, function(err, res) {
        inquirer   
            .prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter the first name of the employee who you like to update."
                },
                {
                    name: "role",
                    type: "input",
                    message: "Enter the employee's new role id.",
                }
            ]).then(function(res) {
                db.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.role, res.name],
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        init();
                    }
                );
            })
    });
};