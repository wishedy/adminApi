import Mock from 'mockjs';
import FeedBackModel from '../../../schemas/feedback/feedback.js';
class Customer{
    constructor(){

    }
    async createFeedback(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    feedback_id:'@datetime(T)',//该反馈的唯一标识
                    customer_id:'@datetime(T)',//反馈用户的id
                    customer_name:"@cname",//反馈用户的名字
                    admin_name:"@cname",//反馈用户的名字
                    admin_id:'@datetime(T)',//反馈用户的名字
                    feedback_content:"@ctitle(44)",//反馈的文字内容
                    'feedback_state|1':['0','1'],//反馈的状态，0新建，1已回复
                    create_time:'@datetime()',//创建反馈的时间
                    feedback_attachment_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//该反馈的相关附件
                    feedback_admin:"@cname",//回复该反馈的管理员
                    feedback_admin_content:"@ctitle(44)",//管理员回复内容
                    update_time:'@datetime()',//回复反馈的时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = FeedBackModel.findOne({'customer_id':data.dataList[i]['customer_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                            FeedBackModel.create(data.dataList[i],function(error){
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
export default new Customer();