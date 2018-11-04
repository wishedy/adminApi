import Mock from 'mockjs';
import ArticleModel from '../../../schemas/cms/article';
class Article{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          article_id:'@guid',//该文章的唯一标识
          customer_id:'@guid',//该文章的作者id,
          customer_name:'@name',//该文章的作者姓名
          article_title:'@ctitle',//文章的标题
          article_content:'@csentence',//文章的简要描述
          article_link:'@url',//文章的链接
          template_id:'@guid',//文章使用的模板id
          'browse_num|20-999': 22,//该文章的浏览量
          'like_num||20-999': 33,//该文章的点赞量
          'forward_num|20-999': 44,//该文章的转发量
          'collect_num|20-999': 55,//该文章的收藏量
          dynamic_id_list: '@guid',//对该文章的评论
          article_attachment_id_list: '@guid',//该文章的相关附件
          recommend_id: '@guid', //推荐形成的id
          'is_valid|1': true,//，0无效,1有效
          create_time: '@datetime',//创建文章的时间
          update_time: '@datetime'//回复文章的最新时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        ArticleModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await ArticleModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Article();

