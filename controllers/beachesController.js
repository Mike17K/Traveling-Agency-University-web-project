import { connection } from '../models/mysql/database.mjs';

async function query(query, values) {
    try {
        const results = await new Promise((resolve, reject) => {
            connection.query(query, values, (error, results, fields) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        return results;
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}


export async function getLastPostId() {
    const q = 'SELECT max(id) as id FROM posts';
    const values = [];

    try {
        const res = await query(q, values);
        console.log("The last post id is:", res);

        if (res === "ERROR") {
            console.log("ERROR GETTING LIKES");
            return {};
        }

        return res[0].id;
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}


export async function getPosts(limit) {
    // id ,img ,title ,organized ,location ,description ,direction

    // posts -> id , name as title, description , location as direction
    // events -> image as img , location, description as organized

    let sql = "SELECT posts.id as id , events.name as title,events.description as organized, posts.description , posts.location as direction ,events.image as img , events.location FROM posts join events on posts.id=events.post_id LIMIT ? "
    const result = await query(sql, [limit]);
    //console.log(result);

    return result;
}


