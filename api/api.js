import { validateUser, addUser, deleteUser, addEvent, deleteEvent, addPost, deletePost, addComment, deleteComment, addRespond, deleteRespond, addReaction, deleteReaction } from '../config/db_functions.mjs';

export class Api {
    static addlike(req, res) {
        /////////////////////////////////////////////////// fix
        const { user_id, post_id } = req.body;

        // check if is already liked
        // if yes delete like
        // else add like
        addReaction(user_id, post_id);

        // select all likes from post_id
        let likescount = 1;

        res.json({
            likescount: likescount
        });
    }

    static addcomment(req, res) {
        res.json({
            data: "hi"
        });
    }

    static test(req, res) {
        res.json({
            res: "ok"
        });
    }
}
