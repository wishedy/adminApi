'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const informSchema = new Schema({
    inform_id:Number,//该举报的唯一标识
    customer_id:Number,//举报用户的id
    customer_name:String,//举报用户的名字
    inform_content:String,//举报的文字内容
    inform_state:String,//举报的状态，0新建，1已回复
    create_time:String,//创建举报的时间
    inform_customer_id:String,//举报的用户的id
    inform_customer_nickname:String,//
    inform_attachment_id_list:String,//该举报的相关附件
    inform_admin:String,//回复该举报的管理员
    inform_admin_content:String,//管理员回复该举报的内容
    update_time:String//回复举报的时间
});
const Inform = mongoose.model('Inform',informSchema);
export default  Inform;