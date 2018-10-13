import Mock from 'mockjs';
import RecommendModel from '../../../schemas/recommend/recommend.js';
class Recommend{
    constructor(){

    }
    async createInform(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    'recommend_id':'@datetime(T)',//该推荐的唯一标识
                    'recommend_customer_id':'@datetime(T)',
                    'recommend_position|1':['0','1','2'],//推荐的位置0遇见栏目，1首页栏目，2消息栏目
                    'recommend_grade|1':['0','1'],//推荐的优先级0按序推荐，1优先推荐
                    'recommend_resource_type|1':['0','1'],//推荐的资源类型0文章，1话题
                    'recommend_resource_id':'@datetime(T)',
                    'recommend_type|1':['0','1'],//推荐的类型0全站推送，1单独推送
                    'create_time':'@datetime()',//创建推荐的时间
                    'admin_id':'@datetime(T)',//该推荐的管理员id,
                    'admin_name':'@cname',//该推荐的管理员名字
                    'is_valid|1':['0','1'],//0无效，1有效
                    'update_time':'@datetime()'//评论操作推荐的最新时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = RecommendModel.findOne({'recommend_id':data.dataList[i]['recommend_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                            RecommendModel.create(data.dataList[i],function(error){
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
export default new Recommend();