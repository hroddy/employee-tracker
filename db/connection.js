const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    user: 'root',
    password: 'PepperCat616',
    host: 'localhost',
    database: 'employee_tracker'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    }
})



module.exports = connection;