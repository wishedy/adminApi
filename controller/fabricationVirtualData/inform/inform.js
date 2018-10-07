import Mock from 'mockjs';
import InformModel from '../../../schemas/inform/inform.js';
class Inform{
    constructor(){

    }
    async createInform(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    inform_id:'@datetime(T)',//该举报的唯一标识
                    customer_id:'@datetime(T)',//举报用户的id
                    customer_name:"@cname",//举报用户的名字
                    inform_content:"@ctitle(44)",//举报的文字内容
                    'inform_state|1':['0','1'],//举报的状态，0新建，1已回复
                    create_time:'@datetime()',//创建举报的时间
                    inform_customer_id:'@datetime(T)',//举报的用户的id
                    inform_customer_name:"@cname",//被举报的用户的名字
                    inform_customer_nickname:"@cname",//被举报的用户的昵称
                    inform_attachment_id_list:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//该举报的相关附件
                    inform_admin_name:"@cname",//回复该举报的管理员名字
                    inform_admin_id:'@datetime(T)',//回复该举报的管理员id
                    inform_admin_content:"@ctitle(44)",//管理员回复该举报的内容
                    update_time:'@datetime()'//回复举报的时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = InformModel.findOne({'inform_id':data.dataList[i]['inform_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                            InformModel.create(data.dataList[i],function(error){
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
export default new Inform();