'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const interestSchema = new Schema({
    interest_id:Number,//兴趣的唯一标识
    interest_name:String,//兴趣的名字
    correlation_customer_id_list:String,//使用过该兴趣的用户id
    create_time:String,//该兴趣创建的时间
    update_time:String//最近被关联的时间
});
const Interest = mongoose.model('Interest',interestSchema);
export default  Interest;  