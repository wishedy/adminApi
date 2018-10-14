import Mock from 'mockjs';
import CustomerModel from '../../../schemas/article/article.js';
class Article{
    constructor(){

    }
    async createCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    article_id:'@datetime(T)',//该文章的唯一标识
                    article_content:'@ctitle(44)',//文章的文字内容
                    article_link:'@url()',//文章的链接
                    template_id:'@datetime(T)',//文章模板id
                    article_title:'@ctitle(10)',//文章的文字内容
                    dynamic_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//文章相关动态
                    create_time:'@datetime()',//创建文章的时间
                    customer_id:'@datetime(T)',//该文章的作者id,
                    customer_name:'@cname',//该文章的作者id,
                    'like_num|100-9999':1,//该文章的点赞量
                    'forward_num|100-9999':1,//该文章的转发量
                    'collect_num|100-9999':1,//该文章的收藏量
                    article_attachment_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//该文章的相关附件
                    'browse_num|100-9999':1,//该文章的浏览量
                    'is_valid|1':['0','1'],//0无效，1有效
                    update_time:'@datetime()'//评论操作文章的最新时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = CustomerModel.findOne({'article_id':data.dataList[i]['article_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                            CustomerModel.create(data.dataList[i],function(error){
                                if(error){
                                    console.log('存储失败');
                                }
                            });
                        }
                    }
                })
                sumNum++;
            }
        }
        await saveCustomerData();
        if(sumNum==data.dataList.length){
            res.send({
                message:'保存完成'
            });
        }
    }
}
export default new Article();