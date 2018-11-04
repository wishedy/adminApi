import Mock from 'mockjs';
import DynamicModel from '../../../schemas/cms/dynamic';
class Dynamic{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          dynamic_id:'@guid',//该动态的唯一标识
          customer_id:'@guid',//该动态的作者id,
          customer_name:'@name',//该动态的作者姓名,
          'dynamic_type|0-2': 1,//0脱单动态，1话题动态，2普通动态
          dynamic_content:'@csentence',//动态的文字内容
          dynamic_attachment_id_list:'@guid',//该动态的相关附件
          // dynamic_relate_id:String,//动态的对象资源id
          'browse_num|20-999':44,//该动态的浏览量
          'like_num|20-999': 200,//该动态的点赞量
          comment_id_list: '@guid',//对该动态的评论
          'is_valid|1':true, //0无效,1有效
          create_time:'@datetime',//创建动态的时间
          update_time:'@datetime',//回复动态的最新时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        DynamicModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await DynamicModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Dynamic();

