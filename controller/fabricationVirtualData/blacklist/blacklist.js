import Mock from 'mockjs';
import CustomerModel from '../../../schemas/blacklist/blacklist.js';
class Customer{
    constructor(){

    }
    async createBlackCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    black_id:'@datetime(T)',//该拉黑的唯一标识
                    customer_id:'@datetime(T)',//拉黑用户的id
                    customer_name:'@cname',//拉黑用户的名字
                    'black_reason|1':['0', '1','2','3','4'],//拉黑的原因0营销诈骗、1淫秽色情、2不友善行为、3诱导欺骗、4虚假资料
                    relate_customer_id:'@datetime(T)',//举报该用户致使拉黑的用户id
                    relate_customer_name:'@cname',//举报该用户致使拉黑的用户名字
                    'black_state|1':['0','1'],//拉黑的状态，0新建，1已激活
                    create_time:'@datetime()',//创建拉黑的时间
                    admin_id:'@datetime(T)',//拉黑该用户的id
                    admin_name:'@cname',//拉黑该用户的名字
                    update_time:'@datetime()'//无效拉黑的时间
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
export default new Customer();