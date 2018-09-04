import responseData from '../../utils/responseData';
import CustomerModel from '../../schemas/customer/customer.js';
class Customer{
    constructor(){

    }
    async getCustomerList(req,res,next){
        let t = this;
        // var paramJson =  JSON.parse(req.body.paramJson);
        var sendData = {};
        // if(common.isEmptyObject(paramJson)||common.isNothing(paramJson)){
        //    //传入的是空对象或者没有传值
        //      sendData = responseData.createResponseData({
        //        message:'参数有误',
        //        data:'NO DATA',
        //        code:0,
        //        responsePk:0
        //     });
        //    res.send(sendData);
        // }else{
            //let searchAll = paramJson.searchAll;
            const Customer = CustomerModel.find({},function(error,userList){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'获取用户参数有误',
                        data:'NO DATA',
                        code:0,
                        responsePk:0
                     });
                }else{
                    if(userList){
                        console.log(userList);
                        sendData = responseData.createResponseData({
                            message:'获取列表成功',
                            data:userList,
                            code:1,
                            responsePk:1
                         });
                    }else{
                        sendData = responseData.createResponseData({
                            message:'获取列表失败',
                            data:userList,
                            code:0,
                            responsePk:0
                         });
                    }
                }
                res.send(sendData);
            });
            // if(searchAll==1){
                
            // }
        // }
    }
}
export default new Customer();