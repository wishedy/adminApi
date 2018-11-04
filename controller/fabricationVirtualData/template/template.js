import Mock from 'mockjs';
import TemplateModel from '../../../schemas/template/template';
class Template{
  async createCustomer(req,res,next){
    const data = Mock.mock({
      'list|30':[
        {
          template_id:'@guid',//该模板的唯一标识
          template_title:'@ctitle',//模板标题
          template_content:'@cparagraph',//模板的文字内容
          'browse_num|20-999':200,//该模板的浏览量
          'use_num|0-999':100,//该模板的点赞量
          'is_valid|1':true,//0无效，1有效
          create_time:'@datetime',//创建模板的时间
          update_time:'@datetime'//评论操作模板的最新时间
        }
      ]
    });
    let sumNum = 0;
    const saveCustomerData = ()=>{
      data.list.forEach(item => {
        TemplateModel.create(item, function(error){
          if(error){
            console.log('存储失败');
          } else {
            sumNum++;
          }
        });
      });
    };
    await TemplateModel.remove();
    await saveCustomerData();
    if(sumNum === data.list.length){
      res.send({
        message:'保存完成'
      });
    }
  }
}
export default new Template();

