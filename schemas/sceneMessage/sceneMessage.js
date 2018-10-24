'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const sceneMessageSchema = new Schema({
    id:String,//消息的唯一标识
    message_title:String,//消息的名字
    message_content:String,//消息的名字
    message_type:String,//消息的名字
    correlation_customer_id_list:String,//使用过该消息的用户id
    create_time:String,//该消息创建的时间
    update_time:String//最近被关联的时间
});
sceneMessageSchema.plugin(mongoosePaginate);
const sceneMessage = mongoose.model('sceneMessage',sceneMessageSchema);
export default  sceneMessage;
