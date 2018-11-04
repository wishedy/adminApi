import Mock from 'mockjs';
import CustomerModel from '../../../schemas/user/customer';
class Customer{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          customer_id:'@guid',//前台线上用户唯一标识
          customer_nickname:'@cname',//用户线上昵称
          customer_name:'@cname',//用户姓名
          'customer_sex|1':['0', '1'],//用户性别，0女，1男
          customer_profession:'@ctitle(8)',//用户职业
          customer_school:'@ctitle(8)',//用户毕业院校
          'customer_account_status|1':['0', '1', '2', '3', '4'],//用户账户状态，0注册，1提交认证，等待审核，2,认证通过,3驳回认证,4拉黑
          'customer_black_reason|1': ['0', '1', '2', '3', '4', '5'], // ** 拉黑原因：0 (没有拉黑) 1 营销诈骗 2 淫秽色情 3 不友善行为 4诱导欺骗 5虚假资料
          'customer_active_vaule|100-200': 120,//用户活跃值
          customer_location:'@county(true)',//用户所在地
          customer_email:'@email',//用户邮箱
          customer_phone_num:'@cword("0123456789", 11)',//用户电话号
          create_time:'@datetime',//用户注册时间
          customer_home:'@province' + '@city',//用户家乡
          customer_birthday:'@date("yyyy-MM-dd")',//生日，yy-mm-dd
          customer_signature:'@csentence',//个性签名，爱情宣言
          'customer_weight|80-300':120,//体重
          'customer_height|140-230':160,//身高
          'customer_emolument|10000-30000':10000,//薪水
          'customer_house':'@ctitle(8)',
          'customer_car':'@ctitle(8)',
          customer_pass_word:'@id',//密码
          customer_wechat:'@id',//微信账户
          customer_qq_account:'@cword("0123456789", 11)',//qq账户
          customer_read_me:'@csentence',//自述
          customer_write_you:'@title',//写给他她
          interest_list: ['@guid'],//兴趣爱好，id,id,id
          customer_rights: '@guid', // ** 权限id
          customer_family_id:'@guid',//家庭情况，id
          // attachment_id_list:String,//该用户拥有附件的id,list,id,id,id,
          customer_audit: '@guid', //审核相关信息 id
          update_time:'@datetime',//最新修改个人基本资料的时间
          'customer_degree|1':['0', '1', '2', '3', '4'],//用户学位0大学专科，1大学本科，2研究生，3博士，4博士后
          'comment_me_num|100-999':100,//评论了我的数量，未看
          'like_me_num|100-999':100,//赞了我的数量，未看
          'message_me_num|100-999':100, //我的留言数量，未看
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        CustomerModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
            if(sumNum === data.list.length){
              res.send({
                message:'保存完成'
              });
            }
          }
        });
      });
    };
    await CustomerModel.remove();
    await saveCustomerData();
  }
}
export default new Customer();
