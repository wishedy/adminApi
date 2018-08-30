'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    id:Number,
    admin_grade:Number,//管理员等级，0超级管理员，1普通管理员
    admin_name:String,//管理员姓名
    admin_email:String,//管理员邮箱
    admin_phone_num:Number,//管理员电话号
    admin_identity_num:Number,//管理员身份证号
    admin_pass_word:String,//管理员密码
    admin_register_time: String//管理员注册时间
});
const Admin = mongoose.model('Admin',adminSchema);
export default  Admin;