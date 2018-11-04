'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const messageSchema = new Schema({
    message_id: String, //消息的唯一标识
    admin_id: String,
    admin_name: String,
    customer_id: String,
    message_type: String, //消息的类型 0站内，1邮件，2短信
    message_related_scene: String, //消息场景
    message_title: String,   //消息的标题
    message_content: String, //消息的内容
    is_valid: Boolean, // 消息状态
    create_at: String, //该消息创建的时间
    update_at: String, //
});
messageSchema.plugin(mongoosePaginate);
const Message = mongoose.model('Message',messageSchema);
export default  Message;
