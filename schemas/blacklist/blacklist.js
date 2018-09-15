'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const blackSchema = new Schema({
    black_id:Number,//该拉黑的唯一标识
    customer_id:Number,//拉黑用户的id
    customer_name:String,//拉黑用户的名字
    black_reason:String,//拉黑的原因
    relate_customer_id:String,//举报该用户致使拉黑的用户id
    relate_customer_name:String,//举报该用户致使拉黑的用户名字
    black_state:String,//拉黑的状态，0新建，1已回复
    create_time:String,//创建拉黑的时间
    admin_id:String,//拉黑该用户的id
    admin_name:String,//拉黑该用户的名字
    update_time:String//无效拉黑的时间
});
const black = mongoose.model('black',blackSchema);
export default  black;