import Mock from 'mockjs';
import MessageSceneModel from '../../../schemas/message/messageScene';
class MessageScene{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          message_scene_id:'@guid',//消息类型的唯一标识
          message_scene_title: '@ctitle',
          message_scene_icon: '@url',
          message_scene_template: '@guid',
          message_scene_link: '@url',
          'is_valid|1': true,
          create_time: '@datetime',
          update_time: '@datetime'
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        MessageSceneModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await MessageSceneModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new MessageScene();

