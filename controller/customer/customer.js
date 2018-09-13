import common from '../../utils/common';
import responseData from '../../utils/responseData';
import CustomerModel from '../../schemas/customer/customer.js';
class Customer{
    constructor(){
        this.getCustomerList = this.getCustomerList.bind(this);
        this.changeCustomerState = this.changeCustomerState.bind(this);
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
    async changeCustomerState(req,res,next){
        let t = this;
        var paramJson =  JSON.parse(req.body.paramJson);
        var sendData = {};
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
            var customerId = paramJson.customerId;
            CustomerModel.findOne({'customer_id':customerId},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'查询用户失败',
                        data:'NO DATA',
                        code:1,
                        responsePk:0
                    });
                    res.send(sendData);
                }else{
                    if(data){
                        var updateState = paramJson.updateState;
                        CustomerModel.update({customer_account_status: updateState}, {multi: false}, function(error, docs){
                            if(error){
                                sendData = responseData.createResponseData({
                                    message:'更新状态失败',
                                    data:'NO DATA',
                                    code:3,
                                    responsePk:customerId
                                });
                                res.send(sendData);
                            }else{
                                if(docs){
                                    var returnDes = '';
                                    //0注册，3拉黑，但凡被拉黑的用户都要重新回归到注册状态重新认证
                                    switch (parseInt(updateState,10)){
                                        case 0:
                                            returnDes = '用户已激活';
                                            break;
                                        case 3:
                                            returnDes = '认证已驳回';
                                            break;
                                        case 4:
                                            returnDes = '用户已拉黑';
                                            break;
                                    }
                                    sendData = responseData.createResponseData({
                                        message:returnDes,
                                        data:JSON.parse(common.toHump(JSON.stringify(docs))),
                                        code:4,
                                        responsePk:customerId
                                    });
                                    res.send(sendData);
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'更新状态失败',
                                        data:'NO DATA',
                                        code:3,
                                        responsePk:customerId
                                    });
                                    res.send(sendData);
                                }
                            }
                            console.log('更改成功：' + docs);
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'该用户不存在',
                            data:'NO DATA',
                            code:2,
                            responsePk:0
                        });
                    }
                }
            });
        }
    }
}
export default new Customer();