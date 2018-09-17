'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const recommendSchema = new Schema({
    recommend_id:Number,//该推荐的唯一标识
    recoment_position:String,//推荐的位置
    recommend_grade:String,//推荐的优先级
    create_time:String,//创建推荐的时间
    customer_id:String,//该推荐的作者id,
    is_valid:String,//0无效，1有效
    update_time:String//评论操作推荐的最新时间
});
recommendSchema.plugin(mongoosePaginate);
const Recommend = mongoose.model('Recommend',recommendSchema);
export default  Recommend;