import Mock from 'mockjs';
import FeedBackModel from '../../../schemas/user/feedback.js';
class Feedback{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          feedback_id:'@guid',//该反馈的唯一标识
          customer_id:'@guid',//反馈用户的id
          customer_name:"@cname",//反馈用户的名字
          admin_name:"@cname",//反馈用户的名字
          admin_id:'@guid',//反馈用户的名字
          feedback_content:"@ctitle(44)",//反馈的文字内容
          'feed_type|0-1': 0, // 返回类型： 0 建议 1 举报
          'feedback_state|0-1': 0,//反馈的状态，0新建，1已回复
          feedback_attachment_id_list:'@guid',//该反馈的相关附件
          feedback_admin:"@cname",//回复该反馈的管理员
          feedback_admin_content:"@csentence(44)",//管理员回复内容
          create_time:'@datetime()',//创建反馈的时间
          update_time:'@datetime()',//回复反馈的时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        FeedBackModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await FeedBackModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Feedback();
