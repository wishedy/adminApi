'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    feedback_id:Number,//该反馈的唯一标识
    customer_id:Number,//反馈用户的id
    customer_name:String,//反馈用户的名字
    feedback_content:String,//反馈的文字内容
    feedback_state:String,//反馈的状态，0新建，1已回复
    create_time:String,//创建反馈的时间
    feedback_attachment_id_list:String,//该反馈的相关附件
    feedback_admin:String,//回复该反馈的管理员
    update_time:String//回复反馈的时间
});
const Feedback = mongoose.model('Feedback',feedbackSchema);
export default  Feedback;