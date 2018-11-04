import Mock from 'mockjs';
import FamilyModel from '../../../../schemas/user/family/family';
class Family{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          family_id:'@guid',//家庭唯一标识
          parents_circumstance:'@csentence',//父母情况
          parents_work:'@csentence',//父母工作
          family_income:'@csentence',//家庭收入主要来源
          create_time:'@datetime',//创建时间
          upload_time:'@datetime'//更新时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        FamilyModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await FamilyModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Family();

