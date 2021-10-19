const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');
const employeeService = require('./services/EmployeeService');
const departmentService = require('./services/DepartmentService');
const roleService = require('./services/RoleService');

const PORT = process.env.PORT || 3001;
const app = express();

//inquirer

const mainMenu = [{
    type: 'list',
    name: 'mainMenu',
    choices: [
    'View all departments',
    'View all roles',
    'View all employees',
    'Add a department',
    "Add a role",
    "Add an employee",
    "Remove an employee",
    "Update an employee role",
    "Save and exit"
    ]
}];

function appMenu() {
    inquirer
    //main menu of actions
        .prompt(mainMenu)
        .then(answer => {
            console.log('selected:', answer);
            switch (answer.mainMenu) {
                case 'View all departments':
                    departmentService.viewDepartments(appMenu);
                    break;

                case 'View all roles':
                    roleService.viewRoles(appMenu);
                    break;

                case 'View all employees':
                    employeeService.viewEmployees(appMenu);
                    break;

                case 'Add a department':
                    departmentService.addDepartment(appMenu);
                    break;

                case "Add a role":
                    roleService.addRole(appMenu);
                    break;

                case "Add an employee":
                    employeeService.addEmployee(appMenu);
                    break;

                case "Remove an employee":
                    employeeService.deleteEmployee(appMenu);
                    break;

                case "Update an employee role":
                    employeeService.updateRole(appMenu);
                    break;

                case "Save and exit":
                    db.end();
                    break;
            }
        });
    
}

appMenu();

module.exports = appMenu;
