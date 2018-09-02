'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const attachmentSchema = new Schema({
    attachment_id:Number,//该附件的唯一标识
    attachment_type:Number,//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
    attachment_link:String,//管理员姓名
    is_valid:String,//附件目前的状态，0无效,1有效
    customer_id:String,//该附件所属的用户
    create_time:String,//管理员身份证号
    attachment_number:String,//附件相关的号码
    attachment_remark: String//附件备注信息
});
const Attachment = mongoose.model('Attachment',attachmentSchema);
export default  Attachment;