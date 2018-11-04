import Mock from 'mockjs';
import AdminModel from '../../../schemas/system/admin';
class Admin{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          admin_id:'@guid',
          'admin_grade|0-1': 1,//管理员等级，0超级管理员，1普通管理员
          admin_name:'@cname',//管理员姓名
          admin_email:'@email',//管理员邮箱
          'admin_phone_num|11':/\d{11}/,//管理员电话号
          admin_identity_num:/\d{16}/,//管理员身份证号
          admin_pass_word:'',//管理员密码
          admin_register_time: '@datetime'//管理员注册时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        AdminModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await AdminModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Admin();

