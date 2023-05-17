import { validateUser, addUser, deleteUser, addEvent, deleteEvent, addPost, deletePost, addComment, deleteComment, addRespond, deleteRespond, addReaction, deleteReaction } from '../models/mysql/db_functions.mjs';
import { getLike, getUserIdByName, getReactionId, getComments, getLikes } from '../controllers/beachController.js';

export class Api {
    static async addLike(req, res) {
        /////////////////////////////////////////////////// fix
        const user_id = await getUserIdByName(req.session.username);

        const { comment_id } = req.body;

        // check if is already liked

        const isLiked = (await getLike(user_id, comment_id)) !== undefined;
        console.log("isLiked:", isLiked);

        let action;
        // if yes delete like
        if (isLiked) {
            // find reaction_id TODO
            const reaction_id = await getReactionId(user_id, comment_id);
            console.log("reaction_id", reaction_id);

            action = "deleted";
            await deleteReaction(reaction_id);
        }
        else {
            // else add like
            console.log("comment id: ", comment_id, " user id: ", user_id);
            await addReaction("like", comment_id, user_id);
            action = "added";
        }

        // select all likes from post_id
        let likescount = await getLikes(comment_id);

        res.json({
            likescount: likescount,
            action: action
        });
    }

    static async addComment(req, res) {
        const { post_id, content } = req.body;
        const user_id = await getUserIdByName(req.session.username);

        if (content === undefined || content === null || content === "") {
            return res.json({
                nope: "add content"
            });
        }

        // add comment
        await addComment(content, post_id, user_id)

        res.redirect(`/beach/${post_id}`);
    }

    static test(req, res) {
        console.log("test");
        res.json({
            res: "ok"
        });
    }
}
