import Mock from 'mockjs';
import BlacklistModel from "../../../schemas/user/blacklist";
class Blacklist{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          black_id:'@guid',//该拉黑的唯一标识
          customer_id:'@guid',//拉黑用户的id
          customer_name:'@cname',//拉黑用户的名字
          'black_reason|0-4':0,//拉黑的原因0营销诈骗、1淫秽色情、2不友善行为、3诱导欺骗、4虚假资料
          relate_customer_id:'@guid',//举报该用户致使拉黑的用户id
          relate_customer_name:'@cname',//举报该用户致使拉黑的用户名字
          'black_state|0-1':0,//拉黑的状态，0新建，1激活
          admin_id:'@guid',//拉黑该用户的id
          admin_name:'@cname',//拉黑该用户的名字
          unlock_admin_id:'@guid',//解锁该用户的id
          unlock_admin_name:'@cname',//解锁该用户的名字
          create_time:'@datetime',//创建拉黑的时间
          update_time:'@datetime'//无效拉黑的时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        BlacklistModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await BlacklistModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Blacklist();

