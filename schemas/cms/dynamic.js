'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const dynamicSchema = new Schema({
    dynamic_id:String,//该动态的唯一标识
    customer_id:String,//该动态的作者id,
    customer_name:String,//该动态的作者姓名,
    dynamic_type:String,//0脱单动态，1话题动态，2普通动态
    dynamic_content:String,//动态的文字内容
    dynamic_attachment_id_list:String,//该动态的相关附件
    // dynamic_relate_id:String,//动态的对象资源id
    browse_num:String,//该动态的浏览量
    like_num:String,//该动态的点赞量
    comment_id_list:String,//对该动态的评论
    is_valid:Boolean, //0无效,1有效
    create_time:String,//创建动态的时间
    update_time:String,//回复动态的最新时间
});
dynamicSchema.plugin(mongoosePaginate);
const Dynamic = mongoose.model('Dynamic',dynamicSchema);
export default  Dynamic;
