'use strict';
const mongoose  = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const templateSchema = new Schema({
    template_id:String,//该模板的唯一标识
    template_title:String,//模板标题
    template_content:String,//模板的文字内容
    create_time:String,//创建模板的时间
    use_num:String,//该模板的点赞量
    browse_num:String,//该模板的浏览量
    is_valid:String,//0无效，1有效
    update_time:String//评论操作模板的最新时间
});
templateSchema.plugin(mongoosePaginate);
const Template = mongoose.model('Template',templateSchema);
export default  Template;