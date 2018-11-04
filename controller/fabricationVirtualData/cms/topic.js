import Mock from 'mockjs';
import TopicModel from '../../../schemas/cms/topic';
import RecommendModel from "../../../schemas/cms/recommend";
class Topic{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          topic_id:'@guid',//该话题的唯一标识
          customer_id:'@guid',//该话题的作者id,
          customer_name:'@name',//该话题的作者name,
          topic_title:'@ctitle',//话题的文字内容
          topic_content:'@csentence',//话题的文字内容
          'browse_num|20-999':200,//该话题的浏览量
          'like_num|20-999':300,//该话题的点赞量
          'forward_num|20-999':400,//该话题的转发量
          'collect_num|20-999':500,//该话题的收藏量
          dynamic_id_list:'@guid',//对该话题的评论
          topic_attachment_id_list:'@guid',//该话题的相关附件
          'topic_status|0-2':1,//0创建待审核，1审核驳回，2审核通过
          'is_valid|1':true,//0无效，1有效
          create_time:'@datetime',//创建话题的时间
          update_time:'@datetime'//评论操作话题的最新时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        TopicModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await TopicModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Topic();

