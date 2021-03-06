'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const familySchema = new Schema({
    family_id:String,//家庭唯一标识
    parents_circumstance:String,//父母情况
    parents_work:String,//父母工作
    family_income:String,//家庭收入主要来源
    create_time:String,//创建时间
    upload_time:String//更新时间
});
familySchema.plugin(mongoosePaginate);
const Family = mongoose.model('Family',familySchema);
export default  Family;