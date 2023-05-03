const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'WebProjectDb'
});

let isDbAvailable=false;

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    isDbAvailable=false;
  } else {
    console.log('Connected successfully to the database');
    isDbAvailable=true;
  }
});

async function validateUser({username,password}) {
  "  Validate user by name and password  "
  if (!isDbAvailable) {
    console.error('Database is not available');
    return false;
  }
  return await new Promise((resolve, reject) => {
    connection.query('SELECT name,password FROM users', (err, results, fields) => {
      if (err) {
        console.error('Failed to execute query:', err);
        reject(err);
      } else {
      let authorized = false;
      //console.log('Query results:', results);
      results.forEach(result => {
        if(result.name==username && result.password==password){
          authorized = true;
        }
      });
      resolve(authorized);
      }
    });
  });
}

module.exports = {
  validateUser
};

