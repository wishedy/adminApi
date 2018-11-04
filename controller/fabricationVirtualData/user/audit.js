import Mock from 'mockjs';
import AuditModel from '../../../schemas/user/audit';
class Audit{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          audit_id:'@guid',//该认证审核的唯一标识
          'audit_type|0-1':0,//认证审核类型，0新建审核，1审核结束
          profession_attachment:'@guid',//工作相关附件
          school_attachment:'@guid',//学历相关附件
          identity_attachment:'@guid',//身份证相关附件
          degree_attachment:'@guid',//学位相关附件
          other_attachment:'@guid',//其他相关附件
          create_time:'@datetime',//该审核创建的时间
          admin_name:'@cname',//审核该审核的管理员
          admin_id:'@guid',//审核该审核的管理员
          'audit_result|0-1':0,//审核结果0驳回，1通过
          customer_id:'@guid',//审核的用户
          customer_name:'@cname',//审核的姓名
          update_time: '@datetime',//最新更新的时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        AuditModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await AuditModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Audit();

