import { getBeaches } from '../models/mysql/db_functions.mjs';
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

export async function getUserIdByName(username) {
    const q = 'SELECT id FROM users WHERE name = ?';
    const values = [username];

    try {
        const res = await query(q, values);
        // console.log("The user id is:", res.id);

        if (res === "ERROR") {
            console.log("ERROR GETTING USER ID");
            return {};
        }

        return res[0].id;
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}

export async function getReactionId(user_id, comment_id) {
    const q = 'SELECT id FROM reaction WHERE user_id = ? AND comment_id = ?';
    const values = [user_id, comment_id];

    try {
        let res = await query(q, values);
        // console.log("The reaction id is:", res.id);

        if (res === "ERROR") {
            console.log("ERROR GETTING REACTION ID");
            return {};
        }

        if (res.length === 0) {
            return undefined;
        }
        return res[0].id;
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}

export async function getLike(user_id, comment_id) {
    const q = 'SELECT * FROM reaction WHERE user_id = ? AND comment_id = ?';
    const values = [user_id, comment_id];

    try {
        const res = await query(q, values);
        console.log("The like data is:", res);

        if (res === "ERROR") {
            console.log("ERROR GETTING LIKE");
            return {};
        }

        if (res.length === 0) {
            return undefined;
        }
        return res;
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}

export async function getLikes(comment_id) {
    const q = 'SELECT count(*) as likes FROM reaction WHERE comment_id = ?';
    const values = [comment_id];

    try {
        const res = await query(q, values);

        if (res === "ERROR") {
            console.log("ERROR GETTING LIKES");
            return {};
        }

        return res[0].likes;
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}

// getComments(post_id)





export async function getBeachByPostId(post_id) {

    try {
        let sql = "select * from events where post_id=?"
        const result = await query(sql, [post_id]);

        if (result === "ERROR") {
            console.log("ERROR GETTING BEACH");
            return {};
        }

        return result[0];
    }
    catch (error) {
        console.log(error);
    }
}

export async function getComments(user_id, post_id) { // fix this next !
    try {
        const q = 'SELECT id,content,user_id,date FROM comment WHERE post_id = ?';
        const values = [post_id];
        const res = await query(q, values);
        //console.log("The comments are:", res);

        if (res === "ERROR") {
            console.log("ERROR GETTING COMMENTS");
            return {};
        }

        // get icon, username for eatch comment
        for (let i = 0; i < res.length; i++) {
            const q = 'SELECT icon,name as username FROM users WHERE id = ?';
            const values = [res[i].user_id];
            const user = await query(q, values);
            res[i] = { ...res[i], ...user[0] };
        }

        // get likes for eatch comment
        for (let i = 0; i < res.length; i++) {
            const comment_id = res[i].id;
            const q = 'SELECT count(*) as likes FROM reaction WHERE comment_id = ?';
            const values = [comment_id];
            const likes = await query(q, values);
            res[i] = { ...res[i], likes: likes[0].likes };
        }

        // get replies for eatch comment
        for (let i = 0; i < res.length; i++) {
            const comment_id = res[i].id;
            const q = 'SELECT count(*) as replies FROM respond WHERE comment_id = ?';
            const values = [comment_id];
            let replies = await query(q, values);
            replies = replies || [{ replies: 0 }];
            res[i] = { ...res[i], replies: replies[0].replies };
        }

        // get if there is a like in the comment for the user
        for (let i = 0; i < res.length; i++) {
            const comment_id = res[i].id;
            const q = 'SELECT * FROM reaction WHERE user_id = ? AND comment_id = ?';
            const values = [user_id, comment_id];
            let liked = await query(q, values);
            //console.log("liked", liked);
            if (liked.length === 0) {
                liked = undefined;
            } else {
                liked = "liked";
            }

            res[i] = { ...res[i], liked: liked };
        }

        //console.log("The comments are:", res);
        return res;
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
}
