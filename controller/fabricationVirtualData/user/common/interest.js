import Mock from 'mockjs';
import InterestModel from '../../../../schemas/user/interest/interest';
class Interest{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          interest_id:'@guid',//兴趣的唯一标识
          interest_name:'@cname',//兴趣的名字
          correlation_customer_id_list:'@guid',//使用过该兴趣的用户id
          create_time:'@datetime',//该兴趣创建的时间
          update_time:'@datetime'//最近被关联的时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        InterestModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await InterestModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Interest();

