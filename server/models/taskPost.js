//taskPost.js
import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    title: String,
    about:String,
    tag:{
        type:String,
        default:'todo'
    },
})

var taskPost = mongoose.model('taskPost', taskSchema,  'taskposts');

export default taskPost;

