import Mock from 'mockjs';
import CommentModel from '../../../../schemas/cms/comment/comment';
class Comment{
    async createCustomer(req,res,next){
        const data = Mock.mock({
            'list|30':[
                {
                  comment_id:'@guid',//该评论的唯一标识
                  customer_id:'@guid',//该评论的作者id,
                  comment_customer_id:'@guid',//评论的对象用户id
                  depend_id:'@guid',//评论的主题id,动态，话题，文章，评论
                  comment_content:'@cparagraph',//评论的文字内容
                  create_time:'@datetime',//创建评论的时间
                  update_time:'@datetime'//回复评论的最新时间
                }
            ]
        });
        let sumNum = 0;
        const saveCustomerData = ()=>{
          data.list.forEach(item => {
            CommentModel.create(item, function(error){
              if(error){
                console.log('存储失败');
              } else {
                sumNum++;
              }
            });
          });
        };
        await CommentModel.remove();
        await saveCustomerData();
        if(sumNum === data.list.length){
            res.send({
                message:'保存完成'
            });
        }
    }
}
export default new Comment();
