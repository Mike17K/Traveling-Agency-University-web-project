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


async function addUser({username,password,re_password}) {
  "  Validate user by name and password  "
  if (!isDbAvailable) {
    console.error('Database is not available');
    return false;
  }
  // here have to check if the user already exists
  // and check if password and re_password are the same
  // also for sql injection for username and password

  return await new Promise((resolve, reject) => {
    connection.query(`INSERT INTO users(name,password) VALUES ('${username}','${password}')`, (err, results) => {
      if (err) {
        console.error('Failed to execute query:', err);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}




module.exports = {
  validateUser,
  addUser
};

