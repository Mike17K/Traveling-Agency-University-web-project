import mysql from 'mysql';

// Create a connection to the database
export const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307, // Specify the port of the Docker container
  user: 'client1',
  password: 'password',
  database: 'WebProjectDb'
});


export async function connect() {
  // Connect to the database
  return await new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Failed to connect to the database:', err);
        reject(err);
        throw err;
      } else {
        console.log('Connected successfully to the database');
        resolve(true);
      }
    });
  }
  );
}

export function disconnect() {
  // Close the connection
  connection.end();
}
