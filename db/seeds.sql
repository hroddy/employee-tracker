INSERT INTO department (id, name) VALUES (01, 'Production');
INSERT INTO department (id, name) VALUES (02, 'Management');
INSERT INTO department (id, name) VALUES (03, 'Marketing');
INSERT INTO department (id, name) VALUES (04, 'HR');

INSERT INTO role (id, title, salary, department_id) VALUES (101, 'Engingeer', 100000, 01);
INSERT INTO role (id, title, salary, department_id) VALUES (201, 'Manager', 150000, 02);
INSERT INTO role (id, title, salary, department_id) VALUES (301, 'Salesperson', 90000, 03);
INSERT INTO role (id, title, salary, department_id) VALUES (401, 'HR Rep', 80000, 04);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (134, Kelly, Person, 101, 212);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (212, Bob, Smith, 201, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (346, Mike, Jones, 301, 212);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (479, Betty, Bets, 401, null);