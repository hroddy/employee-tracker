const db = require('../db/connection');
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
                name: 'department_id',
                type: 'list',
                message: 'Which department does this role belong to?',
                choices: [
                    //how to have them select from existing departments?
                ]
            },
        ]).then(answers => {
            const role = (answers.id, answers.title, answers.salary, answers.department_id);
            const { id, title, salary, departmentId } = role;
            const sql = `INSERT into role VALUES ('${id}, ${title}, ${salary}, ${departmentId}');`;
            this.connection.promise().query(sql).then(prompt());
            console.log(`New role ${id}, ${title} successfully added.`);
            //then display newly updated table with all roles
            this.connection.promise().query(`SELECT * FROM role;`, (err, res) => {
                if (err) throw err;
                console.log('View all roles');
                console.table(res);
            });
            //return to main menu
            appMenu();
        }) //need to catch and throw err ?
        
    };
}

module.exports = new RoleService(db);