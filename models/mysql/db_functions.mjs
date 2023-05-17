import { connection } from './database.mjs';


export async function validateUser({ username, password }) {
  "  Validate user by name and password  "
  return await new Promise((resolve, reject) => {
    connection.query('SELECT name,password FROM users', (err, results, fields) => {
      if (err) {
        console.error('Failed to execute query:', err);
        reject(err);
      } else {
        let authorized = false;
        //console.log('Query results:', results);
        results.forEach(result => {
          if (result.name == username && result.password == password) {
            authorized = true;
          }
        });
        resolve(authorized);
      }
    });
  });
}

export async function addUser(name, password) {
  return await new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (name, password) VALUES (?, ?)`;
    const values = [name, password];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error adding user.');
        reject(err);
      }
      console.log('User added successfully.');
      resolve(true);
    });
  });
}

export async function deleteUser(id) {
  return await new Promise((resolve, reject) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    const values = [id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error deleting user.');
        reject(err);
      }
      console.log('User deleted successfully.');
      resolve(true);
    });
  });
}
export async function addEvent(name, description, date, time, location, image, post_id = null) {
  return await new Promise((resolve, reject) => {
    const sql = `INSERT INTO events (name, description, date, time, location, image, post_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, description, date, time, location, image, post_id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error adding event.');
        reject(error);
      }
      console.log('Event added successfully.');
      resolve(true);
    });
  });
}

export async function deleteEvent(id) {
  return await new Promise((resolve, reject) => {
    const sql = `DELETE FROM events WHERE id = ?`;
    const values = [id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error deleting event.');
        reject(error);

      }
      console.log('Event deleted successfully.');
      resolve(true);
    });
  });
}


export async function addPost(name, description, date, time, location) {
  return await new Promise((resolve, reject) => {
    const sql = `INSERT INTO posts (name, description, date, time, location) VALUES (?, ?, ?, ?, ?)`;
    const values = [name, description, date, time, location];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error adding post.');
        reject(error);

      }
      console.log('Post added successfully.');
      resolve(true);
    });
  });
}

export async function deletePost(id) {
  return await new Promise((resolve, reject) => {
    const sql = `DELETE FROM posts WHERE id = ?`;
    const values = [id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error deleting post.');
        reject(error);

      }
      console.log('Post deleted successfully.');
      resolve(true);
    });
  });
}

export async function addComment(content, post_id, user_id) {
  return await new Promise((resolve, reject) => {
    const sql = `INSERT INTO comment (content, post_id,user_id) VALUES (?, ?, ?)`;
    const values = [content, post_id, user_id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error adding comment.');
        reject(error);

      }
      console.log('Comment added successfully.');
      resolve(true);
    });
  });
}

export async function deleteComment(id) {
  return await new Promise((resolve, reject) => {
    const sql = `DELETE FROM comment WHERE id = ?`;
    const values = [id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error deleting comment.');
        reject(error);

      }
      console.log('Comment deleted successfully.');
      resolve(true);
    });
  });
}

export async function addRespond(comment_id, respond_id) {
  return await new Promise((resolve, reject) => {
    const sql = `INSERT INTO respond (comment_id, respond_id) VALUES (?, ?)`;
    const values = [comment_id, respond_id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error adding respond.');
        reject(error);

      }
      console.log('Respond added successfully.');
      resolve(true);
    });
  });
}

export async function deleteRespond(id) {
  return await new Promise((resolve, reject) => {
    const sql = `DELETE FROM respond WHERE id = ?`;
    const values = [id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error deleting respond.');
        reject(error);

      }
      console.log('Respond deleted successfully.');
      resolve(true);
    });
  });
}

export async function addReaction(content, comment_id, user_id) {
  return await new Promise((resolve, reject) => {
    const sql = `INSERT INTO reaction (content,comment_id, user_id) VALUES (?, ?, ?)`;
    const values = [content, comment_id, user_id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error adding reaction.');
        reject(error);

      }
      console.log('Reaction added successfully.');
      resolve(true);
    });
  });
}

export async function deleteReaction(id) {
  return await new Promise((resolve, reject) => {
    const sql = `DELETE FROM reaction WHERE id = ?`;
    const values = [id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error deleting reaction.');
        reject(error);

      }
      console.log('Reaction deleted successfully.');
      resolve(true);
    });
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// functions for spesific queries
///////////////////////////////////////////////////////////////////////////////////////////////////
import beaches from '../../public/content_data/beaches.js';

export function getBeaches() {
  return beaches;

  /*
  return await new Promise((resolve, reject) => {
    const sql = `DELETE FROM reaction WHERE id = ?`;
    const values = [id];
    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error deleting reaction.');
        reject(error);
        
      }
      console.log('Reaction deleted successfully.');
      resolve(true);
    });}
    );
    */
}
