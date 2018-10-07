import Mock from 'mockjs';
import AuditModel from '../../../schemas/audit/audit.js';
class Audit{
    constructor(){

    }
    async createBlackCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    'customer_profession':"@ctitle(8)",
                    'customer_degree|1':['0','1','2','3','4'],
                    'customer_location': '@province' + '@city',
                    'customer_birthday':'@date("yyyy-MM-dd")',
                    'customer_sex|1':['0','1'],
                    audit_id:'@datetime(T)',//该认证审核的唯一标识
                    'audit_type|1':['0','1'],//认证审核类型，0新建审核，1审核结束
                    profession_attachment:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//工作相关附件
                    school_attachment:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//学历相关附件
                    identity_attachment:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//身份证相关附件
                    degree_attachment:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//学位相关附件
                    other_attachment:'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)'+','+'@datetime(T)',//其他相关附件
                    create_time:'@datetime()',//该审核创建的时间
                    admin_name:"@cname",//审核该审核的管理员
                    admin_id:'@datetime(T)',//审核该审核的管理员
                    'audit_result|1':['0','1'],//审核结果0驳回，1通过
                    customer_id:'@datetime(T)',//审核的用户
                    customer_name:"@cname",//审核的姓名
                    update_time: '@datetime()'//最新更新的时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = AuditModel.findOne({'attachment_id':data.dataList[i]['attachment_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                            AuditModel.create(data.dataList[i],function(error){
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
export default new Audit();