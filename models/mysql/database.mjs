import mysql from 'mysql';
import { config } from 'dotenv';

config();

export let connection;

if (process.env.PRODUCTION == 1) {
  // when using docker-compose use the docker container db
  connection = mysql.createConnection({
    host: 'db',
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
  });
  connection.config.charset = 'utf8mb4';

} else {
  // use the local instanse of mysql
  connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'client1',
    database: 'WebProjectDb',
    password: 'password'
  });
  connection.config.charset = 'utf8mb4';

}


export function connect() {
  let connected = false;
  let tryingtoconnect = false;
  // whait to connect to the database

  /*
  // sync delay for 5 seconds
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    console.log("start sleep");
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    console.log("end sleep");
  }

  sleep(10000);
  //*/

  connection.connect((err) => {
    if (err) {
      connected = false;
      tryingtoconnect = false;
      console.error('Failed to connect to the database:', err);
    } else {
      connected = true;
      console.log('Connected successfully to the database');
    }


    /*
    while (!connected) {
      if (!tryingtoconnect) {
        console.log("trying to connect to the database");
        tryingtoconnect = true;
        connection.connect((err) => {
          if (err) {
            connected = false;
            tryingtoconnect = false;
            console.error('Failed to connect to the database:', err);
          } else {
            connected = true;
            console.log('Connected successfully to the database');
          }
        });
      }
    }
    
    */
  }
  );
}

export function disconnect() {
  // Close the connection
  connection.end();
}
