'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const informSchema = new Schema({
    inform_id:String,//该举报的唯一标识
    customer_id:String,//举报用户的id
    customer_name:String,//举报用户的名字
    inform_content:String,//举报的文字内容
    inform_state:String,//举报的状态，0新建，1已回复
    create_time:String,//创建举报的时间
    inform_customer_id:String,//举报的用户的id
    inform_customer_name:String,//被举报的用户的名字
    inform_customer_nickname:String,//被举报的用户的昵称
    inform_attachment_id_list:String,//该举报的相关附件
    inform_admin_name:String,//回复该举报的管理员名字
    inform_admin_id:String,//回复该举报的管理员id
    inform_admin_content:String,//管理员回复该举报的内容
    update_time:String//回复举报的时间
});
informSchema.plugin(mongoosePaginate);
const Inform = mongoose.model('Inform',informSchema);
export default  Inform;