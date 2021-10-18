const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');
const employeeService = require('./services/EmployeeService');
const departmentService = require('./services/DepartmentService');
const roleService = require('./services/RoleService');

const PORT = process.env.PORT || 3001;
const app = express();

//inquirer

const promptMain = {
    viewDepartments: 'View all departments',
    viewRoles: 'View all roles',
    viewEmployees: 'View all employees',
    addDepartment: 'Add a department',
    addRole: "Add a role",
    addEmployee: "Add an employee",
    updateEmployeeRole: "Update an employee role",
    done: "Save and exit"
};

function appMenu() {
    inquirer
    //main menu of actions
        .prompt({
            name: 'mainMenu',
            type: 'list',
            message: 'Please make a selection.',
            choices: [
                promptMain.viewDepartments,
                promptMain.viewRoles,
                promptMain.viewEmployees,
                promptMain.addDepartment,
                promptMain.addRole,
                promptMain.addEmployee,
                promptMain.updateEmployeeRole,
                promptMain.done
            ]
        })
        .then(answer => {
            console.log('answer', answer);
            switch (answer.mainMenu) {
                case promptMain.viewDepartments:
                    departmentService.viewDepartments(appMenu);
                    break;

                case promptMain.viewRoles:
                    roleService.viewRoles(appMenu);
                    break;

                case promptMain.viewEmployees:
                    employeeService.viewEmployees(appMenu);
                    break;

                case promptMain.addDepartment:
                    departmentService.addDepartment(appMenu);
                    break;

                case promptMain.addRole:
                    roleService.addRole(appMenu);
                    break;

                case promptMain.addEmployee:
                    employeeService.addEmployee(appMenu);
                    break;

                case promptMain.updateEmployeeRole:
                    employeeService.updateRole(appMenu);
                    break;

                case promptMain.done:
                    db.end();
                    break;
            }
        });
    
}

appMenu();

module.exports = appMenu;
