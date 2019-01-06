'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const authSchema = new Schema({
    id:String,//消息的唯一标识
    from: String,
    is_valid: Boolean,
    message_related_scene: String,
    message_title:String,
    message_content:String,
    message_type:String,
    correlation_customer_id_list:String,
    create_time:String,
    update_time:String
});
authSchema.plugin(mongoosePaginate);
const Auth = mongoose.model('Auth',authSchema);
export default  Auth;
