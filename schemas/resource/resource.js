'use strict';
const mongoose  = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const resourceSchema = new Schema({
    resource_id:String,//该资源的唯一标识
    resource_content:String,//资源的文字内容
    resource_link:String,//资源相关链接
    dynamic_id_list:String,//资源相关动态
    create_time:String,//创建资源的时间
    customer_id:String,//该资源的作者id,
    resource_relate_id:String,//资源的对象资源id
    like_num:String,//该资源的点赞量
    collect_num:String,//该资源的收藏量
    resource_attachment_id_list:String,//该资源的相关附件
    comment_id_list:String,//对该资源的评论
    browse_num:String,//该资源的浏览量    
    is_valid:String,//0无效，1有效
    update_time:String//评论操作资源的最新时间
});
resourceSchema.plugin(mongoosePaginate);
const Resource = mongoose.model('Resource',resourceSchema);
export default  Resource;