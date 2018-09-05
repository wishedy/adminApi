import common from '../../utils/common';
import responseData from '../../utils/responseData';
import CustomerModel from '../../schemas/customer/customer.js';
class Customer{
    constructor(){

    }
    async getCustomerList(req,res,next){
        let t = this;
        var paramJson =  req.query;
        var pageSize = paramJson.pageSize;
        var pageIndex = paramJson.pageIndex;
        delete paramJson.pageSize;
        delete paramJson.pageIndex;
        console.log(pageSize,pageIndex,paramJson);
        var sendData = {};
        console.log(paramJson);
        if(common.isEmptyObject(paramJson)||common.isNothing(paramJson)){
           //传入的是空对象或者没有传值
             sendData = responseData.createResponseData({
               message:'参数有误',
               data:'NO DATA',
               code:0,
               responsePk:0
            });
           res.send(sendData);
        }else{
            const searchJson = JSON.parse(common.toLine(JSON.stringify(paramJson)));
            console.log(searchJson,pageIndex,pageSize);
             const Customer = CustomerModel.paginate((searchJson), { page: parseInt(pageIndex), limit: parseInt(pageSize) }, function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'获取用户参数有误',
                        data:'NO DATA',
                        code:0,
                        responsePk:0
                     });
                }else{
                    if(data.docs){
                        sendData = responseData.createResponseData({
                            message:'获取列表成功',
                            data:JSON.parse(common.toHump(JSON.stringify(data.docs))),
                            code:1,
                            responsePk:1
                         });
                    }else{
                        sendData = responseData.createResponseData({
                            message:'获取列表失败',
                            data:'NO DATA',
                            code:0,
                            responsePk:0
                         });
                    }
                }
                
                res.send(sendData);
            });
        }
    }
}
export default new Customer();