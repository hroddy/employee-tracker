const inquirer = require("inquirer");
const db = require("../db/connection");
const appMenu = require("../server");

class EmployeeService {
  constructor(connection) {
    this.connection = connection;
  }

  addEmployee(appMenu) {
    //add a brand new employee
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the new employee's id number?",
        },
        {
          name: "firstName",
          type: "input",
          message: "What is the new employee's first name?",
        },
        {
          name: "lastName",
          type: "input",
          message: "What is the new employee's last name?",
        },
      ])
      .then((firstAnswers) => {
        const { id, firstName, lastName } = firstAnswers;
        this.connection.query(`SELECT * FROM role;`, (err, res) => {
          if (err) throw err;
          const roleChoices = res.map((role) => `${role.id}`);
          inquirer
            .prompt([
              {
                name: "roleId",
                type: "list",
                message: "What is the new employee's role id?",
                choices: roleChoices,
              },
            ])
            .then((secondAnswers) => {
              const { roleId } = secondAnswers;
              this.connection.query(
                `SELECT id FROM employee WHERE manager_id is null;`,
                (err, res) => {
                  if (err) throw err;
                  const managerChoices = res.map(
                    (employee) => `${employee.id}`
                  );
                  inquirer
                    .prompt([
                      {
                        name: "managerId",
                        type: "list",
                        message: "Which manager will this employee report to?",
                        choices: managerChoices,
                      },
                    ])
                    .then((thirdAnswers) => {
                      const { managerId } = thirdAnswers;
                      console.log(id, firstName, lastName, roleId, managerId);
                      const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${id}, '${firstName}', '${lastName}', ${roleId}, ${managerId});`;
                      this.connection.query(sql);
                      console.log(`Employee added.`);
                      //then display newly updated employee table with all employees
                      this.connection.query(
                        `SELECT * FROM employee;`,
                        (err, res) => {
                          if (err) throw err;
                          console.log("View all employees");
                          console.table(res);
                          //return to main menu
                          appMenu();
                        }
                      );
                    });
                }
              );
            });
        });
      });
  }

  updateRole(appMenu) {
    //change the role id of an existing employee
    this.connection.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      const employeeChoices = res.map((employee) => `${employee.id}`);
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message:
              "Please select the id of the employee whose role you would like to update.",
            choices: employeeChoices,
          },
        ])
        .then((idAnswers) => {
          const { id } = idAnswers;
          this.connection.query(`SELECT * FROM role;`, (err, res) => {
            if (err) throw err;
            const roleChoices = res.map((role) => `${role.id}`);
            inquirer
              .prompt([
                {
                  name: "roleId",
                  type: "list",
                  message: `Please select the role id of the new role you would like to assign employee #${id}.`,
                  choices: roleChoices,
                },
              ])
              .then((roleAnswers) => {
                const { roleId } = roleAnswers;
                const sql = `UPDATE employee SET employee.role_id = ${roleId} WHERE employee.id = ${id};`;
                this.connection.query(sql);
                console.log(
                  `Employee #${id}'s role has been updated to ${roleId}`
                );
                //then display newly updated employee table with all employees
                this.connection.query(`SELECT * FROM employee;`, (err, res) => {
                  if (err) throw err;
                  console.log("View all employees");
                  console.table(res);
                  //return to main menu
                  appMenu();
                });
              });
          });
        });
    });
  }

  viewEmployees(appMenu) {
    //view all employees
    const sql = `SELECT * FROM employee;`;

    return this.connection.query(sql, (err, res) => {
      if (err) throw err;
      console.log("View all Employees");
      console.table(res);
      //return to main menu
      appMenu();
    });
  }

  deleteEmployee(appMenu) {
    //delete an employee
    this.connection.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      const employeeChoices = res.map((employee) => `${employee.id}`);
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message:
              "Please select the id of the employee you would like to remove.",
            choices: employeeChoices,
          },
        ])
        .then((answers) => {
          const { id } = answers;
          const sql = `DELETE FROM employee WHERE employee.id = ${id};`;
          this.connection.query(sql);
          console.log(`Employee #${id} removed`);
          //then display newly updated employee table with all employees
          this.connection.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            console.log("View all employees");
            console.table(res);
            //return to main menu
            appMenu();
          });
        });
    });
  }
}

module.exports = new EmployeeService(db);
