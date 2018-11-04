import Mock from 'mockjs';
import MessageModel from '../../../schemas/message/message';
class Message{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          message_id: '@guid', //消息的唯一标识
          admin_id: '@guid',
          admin_name: '@cname',
          customer_id: '@guid',
          'message_type|0-2': 0, //消息的类型 0站内，1邮件，2短信
          'message_related_scene|0-2': 0, //消息场景
          message_title: '@ctitle',   //消息的标题
          message_content: '@csentence', //消息的内容
          'is_valid|1': true, // 消息状态
          create_at: '@datetime', //该消息创建的时间
          update_at: '@datetime'
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        MessageModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await MessageModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Message();

