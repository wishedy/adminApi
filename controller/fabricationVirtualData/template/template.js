import Mock from 'mockjs';
import CustomerModel from '../../../schemas/template/template.js';
class Template{
    constructor(){

    }
    async createCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {

                    template_id:'@datetime(T)',//该话题的唯一标识
                    template_content:'@ctitle(44)',//话题的文字内容
                    template_title:'@ctitle(10)',//话题的文字内容
                    create_time:'@datetime()',//创建话题的时间
                    'use_num|100-9999':1,//该话题的点赞量
                    'browse_num|100-9999':1,//该话题的浏览量
                    'is_valid|1':['0','1'],//0无效，1有效
                    update_time:'@datetime()'//评论操作话题的最新时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = CustomerModel.findOne({'template_id':data.dataList[i]['template_id']},function(error,userInfo){
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
export default new Template();