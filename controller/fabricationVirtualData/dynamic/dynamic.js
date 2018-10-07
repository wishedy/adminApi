import Mock from 'mockjs';
import DynamicModel from '../../../schemas/dynamic/dynamic.js';
class Dynamic{
    constructor(){

    }
    async createBlackCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    dynamic_id:'@datetime(T)',//该动态的唯一标识
                    dynamic_content:'@ctitle(44)',//动态的文字内容
                    'dynamic_type|1':['0','1','2'],//0脱单动态，1话题动态，2普通动态
                    create_time:'@datetime()',//创建动态的时间
                    customer_id:'@datetime(T)',//该动态的作者id,
                    dynamic_relate_id:'@datetime(T)',//动态的对象资源id
                    'like_num|100-9999':1,//该动态的点赞量
                    'is_valid|1':['0','1'],//，0无效,1有效
                    dynamic_attachment_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//该动态的相关附件
                    comment_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//对该动态的评论
                    'browse_num|100-9999':1,//该动态的浏览量
                    update_time:'@datetime()'//回复动态的最新时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = DynamicModel.findOne({'dynamic_id':data.dataList[i]['dynamic_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                            DynamicModel.create(data.dataList[i],function(error){
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
export default new Dynamic();