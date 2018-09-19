'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const auditSchema = new Schema({
    audit_id:Number,//该认证审核的唯一标识
    audit_type:Number,//认证审核类型，0新建审核，1审核结束
    profession_attachment:Number,//工作相关附件
    education_attachment:String,//学历相关附件
    identity_attachment:String,//身份证相关附件
    degree_attachment:String,//学位相关附件
    other_attachment:String,//其他相关附件
    create_time:String,//该审核创建的时间
    audit_admin:String,//审核该审核的管理员
    audit_result:String,//审核结果
    customer_id:String,//审核的用户
    customer_name:String,//审核的姓名
    update_time: String//最新更新的时间
});
auditSchema.plugin(mongoosePaginate);
const Audit = mongoose.model('Audit',auditSchema);
export default  Audit;