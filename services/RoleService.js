const db = require('../db/connection');
const inquirer = require('inquirer');
const appMenu = require('../server');

class RoleService {

    constructor(connection) {
        this.connection = connection;
    }

    //display all roles with title, id, salary
    viewRoles(appMenu)  {
        const sql = `SELECT * FROM role;`;
    
        return this.connection.query(sql, (err, res) => {
            if (err) throw err;
            console.log('View all roles');
            console.table(res);
            //return to main menu
            appMenu();
        });
    
    }

    //add a new department to the department table
    addRole(appMenu) {

        this.connection.query(`SELECT * FROM department;`, (err, res) => {
            if (err) throw err;
            const departmentChoices = res.map(department => `${department.id}`);
            inquirer.prompt([
                {
                    name: 'id',
                    type: 'input',
                    message: 'What is the id of the new role?'
                },
                {
                    name: 'title',
                    type: 'input',
                    message: 'What is the title of the new role?'
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of the new role?'
                },
                {
                    name: 'departmentId',
                    type: 'list',
                    message: 'Which department does this role belong to?',
                    choices: departmentChoices
                },
            ]).then(answers => {
                const { id, title, salary, departmentId } = answers;
                const sql = `INSERT into role VALUES (${id}, '${title}', ${salary}, ${departmentId});`;
                this.connection.query(sql);
                console.log(`New role ${id}, ${title} successfully added.`);
                //then display newly updated table with all roles
                this.connection.query(`SELECT * FROM role;`, (err, res) => {
                    if (err) throw err;
                    console.log('View all roles');
                    console.table(res);
                    //return to main menu
                    appMenu();
                });
                
                
            })
        
        })

    }
}


module.exports = new RoleService(db);