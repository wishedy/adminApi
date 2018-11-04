'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const customerSchema = new Schema({
    customer_id:String,//前台线上用户唯一标识
    customer_nickname:String,//用户线上昵称
    customer_name:String,//用户姓名
    customer_sex:String,//用户性别，0女，1男
    customer_profession:String,//用户职业
    customer_school:String,//用户毕业院校
    customer_account_status:String,//用户账户状态，0注册，1提交认证，等待审核，2,认证通过,3驳回认证,4拉黑
    customer_black_reason: String, // ** 拉黑原因：0 (没有拉黑) 1 营销诈骗 2 淫秽色情 3 不友善行为 4诱导欺骗 5虚假资料
    customer_active_vaule: String,//用户活跃值
    customer_location:String,//用户所在地
    customer_email:String,//用户邮箱
    customer_phone_num:String,//用户电话号
    create_time:String,//用户注册时间
    customer_home:String,//用户家乡
    customer_birthday:String,//生日，yy-mm-dd
    customer_signature:String,//个性签名，爱情宣言
    customer_weight:String,//体重
    customer_height:String,//身高
    customer_emolument:String,//薪水
    customer_house:String,//购房情况
    customer_car:String,//购车情况
    customer_pass_word:String,//密码
    customer_wechat:String,//微信账户
    customer_qq_account:String,//qq账户
    customer_read_me:String,//自述
    customer_write_you:String,//写给他她
    interest_list: Array,//兴趣爱好，id,id,id
    customer_rights: String, // ** 权限id
    customer_family_id:String,//家庭情况，id
    // attachment_id_list:String,//该用户拥有附件的id,list,id,id,id,
    customer_audit: String, //审核相关信息 id
    update_time:String,//最新修改个人基本资料的时间
    customer_degree:String,//用户学位0大学专科，1大学本科，2研究生，3博士，4博士后
    comment_me_num:String,//评论了我的数量，未看
    like_me_num:String,//赞了我的数量，未看
    message_me_num:String, //我的留言数量，未看
});
customerSchema.plugin(mongoosePaginate);
const Customer = mongoose.model('Customer',customerSchema);
export default  Customer;
