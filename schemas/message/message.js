'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const messageSchema = new Schema({
    id:String,//消息的唯一标识
    from: String,     //消息来源
    to:String,//使用过该消息的用户id
    is_valid: Boolean,
    message_related_scene: String,
    message_title:String,   //消息的标题
    message_content:String, //消息的内容
    message_type:String,    //消息的类型
    create_time:String,//该消息创建的时间
    update_time:String, //最近被关联的时间
});
messageSchema.plugin(mongoosePaginate);
const Message = mongoose.model('Message',messageSchema);
export default  Message;
