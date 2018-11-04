import Mock from 'mockjs';
import SceneModel from '../../../../schemas/system/auth/scene';
class Scene{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          scene_id:'@guid',
          scene_title:'@ctitle',
          'customer_state|0-4': 0,
          'experience_times|0-20': 10,
          'visitor_enable|1': false,
          'black_enable|1': false,
          'registered_enable|1': false,
          'checked_enable|1': false,
          'is_valid|1':true,
          create_time: '@datetime',
          update_time: '@datetime',
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        SceneModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await SceneModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Scene();

