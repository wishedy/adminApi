'use strict';
const mongoose  = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const topicSchema = new Schema({
    topic_id:String,//该话题的唯一标识
    topic_content:String,//话题的文字内容
    topic_title:String,//话题的文字内容
    dynamic_id_list:String,//话题相关动态
    create_time:String,//创建话题的时间
    customer_id:String,//该话题的作者id,
    customer_name:String,//该话题的作者name,
    like_num:String,//该话题的点赞量
    forward_num:String,//该话题的转发量
    collect_num:String,//该话题的收藏量
    topic_attachment_id_list:String,//该话题的相关附件
    browse_num:String,//该话题的浏览量    
    topic_status:String,//0创建待审核，1审核驳回，2审核通过
    is_valid:String,//0无效，1有效
    update_time:String//评论操作话题的最新时间
});
topicSchema.plugin(mongoosePaginate);
const topic = mongoose.model('topic',topicSchema);
export default  topic;