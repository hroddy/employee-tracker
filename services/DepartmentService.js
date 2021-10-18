const inquirer = require('inquirer');
const db = require('../db/connection');

class DepartmentService {

    constructor(connection) {
        this.connection = connection;
    }

    //display all departments with name and id
    viewDepartments(appMenu)  {
    const sql = `SELECT * FROM department;`;

    return this.connection.query(sql, (err, res) => {
        if (err) throw err;
        console.log('View all departments');
        console.table(res);
        //return to main menu
        appMenu();

    });

    }

    //add a new department to the department table
    addDepartment(appMenu) {
        inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What is the new department id number?'
            
        },
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the new department?'
        }
        ]).then(answers => {
            const department = (answers.id, answers.name)
            const { id, name } = department;
            const sql = `INSERT into department VALUES (${id}, '${name}');`;
            console.log(`New department ${name}, ${id} successfully added.`);
            this.connection.promise().query(sql);
            //then display newly updated department table
            this.connection.promise().query(`SELECT * FROM department;`, (err, res) => {
                if (err) throw err;
                console.log('View all departments');
                console.table(res);
            });
            //return to main menu
            appMenu();
        })
    };
}

module.exports = new DepartmentService(db);
