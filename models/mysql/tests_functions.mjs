import {validateUser,addUser,deleteUser,addEvent,deleteEvent,addPost,deletePost,addComment,deleteComment,addRespond,deleteRespond,addReaction,deleteReaction} from './db_functions.mjs';
import { connect, disconnect } from './database.mjs';

connect().then((res)=>{    
if(res){
    // ok | addUser('NewUser', 'newpassword').then(res=>{console.log(res));
    // ok | validateUser({username: 'NewUser', password: 'newpassword'}).then(res=>console.log(res));
    // ok | deleteUser(1).then(res=>console.log(res));
    // ok | addEvent('NewEvent', 'newdescription', '2021-05-05', '12:00:00', 'newlocation', 'newimage', null).then(res=>console.log(res));
    // ok | deleteEvent(1).then(res=>console.log(res));
    // ok | addPost('NewPost', 'newdescription', '2021-05-05', '12:00:00', 'newlocation', 'newimage', 2).then(res=>console.log(res));
    // ok | deletePost(1).then(res=>console.log(res));
    // ok | addComment('NewComment', 1, 2).then(res=>console.log(res));
    // ok | deleteComment(1).then(res=>console.log(res));
    // ok | addRespond(1, 1).then(res=>console.log(res));
    // ok | deleteRespond(1).then(res=>console.log(res));
    // ok | addReaction('like', 1,2).then(res=>console.log(res));
    // ok | deleteReaction(1).then(res=>console.log(res));
    
    disconnect(); // to end the test put this in the then of the last function
}
}
);
