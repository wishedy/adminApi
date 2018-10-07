import Mock from 'mockjs';
import AttachmentModel from '../../../schemas/attachment/attachment.js';
class Attachment{
    constructor(){

    }
    async createBlackCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    attachment_id:'@datetime(T)',//该附件的唯一标识
                    'attachment_type:|1':['0', '1','2','3','4','5','6','7','8'],//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
                    attachment_link:"@image('200x100', '#50B347', '#FFF', 'Mock.js')",//管理员姓名
                    'is_valid|1':['0','1'],//附件目前的状态，0无效,1有效
                    customer_id:'@datetime(T)',//该附件所属的用户
                    create_time:'@datetime()',//管理员身份证号
                    update_time:'@datetime()',//管理员身份证号
                    'attachment_number|100000000-999999999':1,//附件相关的号码
                    attachment_remark: '@ctitle(22)'//附件备注信息
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = AttachmentModel.findOne({'attachment_id':data.dataList[i]['attachment_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                            AttachmentModel.create(data.dataList[i],function(error){
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
export default new Attachment();