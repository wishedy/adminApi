'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const recommendSchema = new Schema({
    recommend_id:String,//该推荐的唯一标识
    admin_id:String,//该推荐的管理员id,
    admin_name:String,//该推荐的管理员名字
    recommend_customer_id:String,//推荐的目标id
    recommend_position:String,//推荐的位置0遇见栏目，1首页栏目，2消息栏目
    recommend_grade:String,//推荐的优先级0按序推荐，1优先推荐
    recommend_resource_type:String,//推荐的资源类型0文章，1话题
    recommend_resource_id:String,//推荐的资源类型0文章，1话题
    recommend_type:String,//推荐的类型0全站推送，1单独推送
    is_valid:Boolean,//0无效，1有效
    create_time:String,//创建推荐的时间
    update_time:String//评论操作推荐的最新时间
});
recommendSchema.plugin(mongoosePaginate);
const Recommend = mongoose.model('Recommend',recommendSchema);
export default  Recommend;
