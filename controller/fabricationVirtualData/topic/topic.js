import Mock from 'mockjs';
import CustomerModel from '../../../schemas/topic/topic.js';
class Topic{
    constructor(){

    }
    async createCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    topic_id:'@datetime(T)',//该话题的唯一标识
                    topic_content:'@ctitle(44)',//话题的文字内容
                    topic_title:'@ctitle(10)',//话题的文字内容
                    dynamic_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//话题相关动态
                    create_time:'@datetime()',//创建话题的时间
                    customer_id:'@datetime(T)',//该话题的作者id,
                    customer_name:'@cname',//该话题的作者id,
                    'like_num|100-9999':1,//该话题的点赞量
                    'forward_num|100-9999':1,//该话题的转发量
                    'collect_num|100-9999':1,//该话题的收藏量
                    topic_attachment_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//该话题的相关附件
                    'browse_num|100-9999':1,//该话题的浏览量
                    'topic_status|1':['0','1','2'],//0创建待审核，1审核驳回，2审核通过
                    'is_valid|1':['0','1'],//0无效，1有效
                    update_time:'@datetime()'//评论操作话题的最新时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = CustomerModel.findOne({'customer_id':data.dataList[i]['customer_id']},function(error,userInfo){
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
export default new Topic();