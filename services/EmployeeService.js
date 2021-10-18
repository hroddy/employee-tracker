const inquirer = require('inquirer');
const db = require('../db/connection');
const appMenu = require('../server');

class EmployeeService {

    constructor(connection) {
        this.connection = connection;
    }

    addEmployee(appMenu) {
        inquirer.prompt([
            {
            name: 'id',
            type: 'input',
            message: "What is the new employee's id number?"
            },
            {
                name: 'first_name',
                type: 'input',
                message: "What is the new employee's first name?"
            },
            {
                name: 'last_name',
                type: 'input',
                message: "What is the new employee's last name?"
            },
            {
                name: 'role_id',
                type: 'input',
                message: "What is the new employee's role id?"
                //allow them to select from exisitng roles?
            },
            {
                name: 'manager_id',
                type: 'input',
                message: "What manager will this employee report to?"
                //allow them to select from exisitng managers?
            },
        ]).then(answers => {
            const employee = (answers.id, answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
            const { id, firstName, lastName, roleId, managerId } = employee;
            const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${id}, '${firstName}', '${lastName}', ${roleId}, ${managerId});`;
            this.connection.promise().query(sql);
            console.log(`Employee added.`);
            //then display newly updated employee table with all employees
            this.connection.promise().query(`SELECT * FROM employee;`, (err, res) => {
                if (err) throw err;
                console.log('View all employees');
                console.table(res);
            });
            //return to main menu
            appMenu();
        });
    }

    updateRole(appMenu) {
        //update
        inquirer.prompt([
            {
            name: 'id',
            type: 'input',
            message: "Which employee's role would you like to update? Please type their id number."
            //select from the existing employees?
            },
            {
                name: 'role',
                type: 'input',
                message: 'Please select the new role to assign.'
                //select from the existing roles?
            }
        ]).then(answers => {
            const employee = (answers.id, answers.role);
            const { id, role } = employee;
            const sql = `UPDATE employee SET employee.role = ${role} WHERE employee.id = ${id};`;
            this.connection.promise().query(sql);
            console.log(`Employee #${id}'s role has been updated to ${role}`);
            //then display newly updated employee table with all employees
            this.connection.promise().query(`SELECT * FROM employee;`, (err, res) => {
                if (err) throw err;
                console.log('View all employees');
                console.table(res);
            });
            //return to main menu
            appMenu();
        });        
    }

    viewEmployee(appMenu) {
        //view all employees
        const sql = `SELECT * FROM employee;`;

        return this.connection.promise().query(sql, (err, res) => {
            if (err) throw err;
            console.log('View all Employees');
            console.table(res);
            //return to main menu
            appMenu();
        });
    }

    deleteEmployee(appMenu) {
        //delete an employee
        inquirer.prompt({
            name: 'id',
            type: 'input',
            message: "Please type the id number of the employee you'd like to remove from the database."
            //select from the existing employees?
        }).then(answers => {
            const sql = `DELETE FROM employee WHERE employee.id = ${answers.id};`;
            this.connection.promise().query(sql);
            console.log(`Employee ${answers.id} removed`);
            //then display newly updated employee table with all employees
            this.connection.promise().query(`SELECT * FROM employee;`, (err, res) => {
                if (err) throw err;
                console.log('View all employees');
                console.table(res);
            });
            //return to main menu
            appMenu();
        });
    }
}

module.exports = new EmployeeService(db);