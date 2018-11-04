'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const articleSchema = new Schema({
    article_id:String,//该文章的唯一标识
    customer_id:String,//该文章的作者id,
    customer_name:String,//该文章的作者姓名
    article_title:String,//文章的标题
    article_content:String,//文章的简要描述
    article_link:String,//文章的链接
    template_id:String,//文章使用的模板id
    browse_num:String,//该文章的浏览量
    like_num:String,//该文章的点赞量
    forward_num:String,//该文章的转发量
    collect_num:String,//该文章的收藏量
    dynamic_id_list:String,//对该文章的评论
    article_attachment_id_list:String,//该文章的相关附件
    recommend_id: String, //推荐形成的id
    is_valid:Boolean,//，0无效,1有效
    create_time:String,//创建文章的时间
    update_time:String//回复文章的最新时间
});
articleSchema.plugin(mongoosePaginate);
const article = mongoose.model('article',articleSchema);
export default  article;
