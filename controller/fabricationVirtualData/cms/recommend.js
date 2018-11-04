import Mock from 'mockjs';
import RecommendModel from '../../../schemas/cms/recommend';
class Recommend{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          recommend_id:'@guid',//该推荐的唯一标识
          admin_id:'@guid',//该推荐的管理员id,
          admin_name:'@name',//该推荐的管理员名字
          recommend_customer_id:'@guid',//推荐的目标id
          recommend_position:String,//推荐的位置0遇见栏目，1首页栏目，2消息栏目
          recommend_grade:String,//推荐的优先级0按序推荐，1优先推荐
          recommend_resource_type:String,//推荐的资源类型0文章，1话题
          recommend_resource_id: '@guid',//推荐的资源类型0文章，1话题
          recommend_type:String,//推荐的类型0全站推送，1单独推送
          'is_valid|1': true,//0无效，1有效
          create_time:'@datetime',//创建推荐的时间
          update_time:'@datetime'//评论操作推荐的最新时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        RecommendModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await RecommendModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Recommend();

