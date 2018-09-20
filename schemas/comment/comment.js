'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const commentSchema = new Schema({
    comment_id:String,//该评论的唯一标识
    comment_content:String,//评论的文字内容
    create_time:String,//创建评论的时间
    depend_id:String,//评论的主题id,动态，话题，文章，评论
    customer_id:String,//该评论的作者id,
    comment_customer_id:String,//评论的对象用户id
    update_time:String//回复评论的最新时间
});
commentSchema.plugin(mongoosePaginate);
const Comment = mongoose.model('Comment',commentSchema);
export default  Comment;