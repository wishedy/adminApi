'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const dynamicSchema = new Schema({
    dynamic_id:Number,//该动态的唯一标识
    dynamic_content:String,//动态的文字内容
    create_time:String,//创建动态的时间
    customer_id:String,//该动态的作者id,
    dynamic_relate_id:String,//动态的对象资源id
    like_num:String,//该动态的点赞量
    dynamic_attachment_id_list:String,//该动态的相关附件
    comment_id_list:String,//对该动态的评论
    browse_num:String,//该动态的浏览量    
    update_time:String//回复动态的最新时间
});
const Dynamic = mongoose.model('Dynamic',dynamicSchema);
export default  Dynamic;