import Mock from 'mockjs';
import AttachmentModel from '../../../../schemas/user/attachment/attachment';
class Attachment{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          attachment_id:'@guid',//该附件的唯一标识
          'attachment_type|0-7': 0,//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
          attachment_link:'@guid',//管理员姓名
          'is_valid|1': false,//附件目前的状态，0无效,1有效
          customer_id:'@guid',//该附件所属的用户
          create_time:'@datetime',
          update_time:'@datetime',
          attachment_number: /\d{9}/,//附件相关的号码
          attachment_remark: '@csentence'//附件备注信息
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        AttachmentModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await AttachmentModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Attachment();

