import common from '../../utils/common';
import responseData from '../../utils/responseData';
import CustomerModel from '../../schemas/customer/customer.js';
import AuditModel from '../../schemas/audit/audit.js';
import FeedbackModel from '../../schemas/feedback/feedback.js';
import InformModel from '../../schemas/inform/inform.js';
import BlacklistModel from '../../schemas/blacklist/blacklist.js';
const dtime = require('time-formater');
class Customer{
    constructor(){
        this.getJsonList = this.getJsonList.bind(this);
        this.changeCustomerState = this.changeCustomerState.bind(this);
    }
    async getJsonList(req,res,next){
        let t = this;

        let paramJson =  req.query;
        let pageSize = paramJson.pageSize;
        let pageIndex = paramJson.pageIndex;
        let getJsonType = paramJson.getType;
        console.log('操作');
        delete paramJson.pageSize;
        delete paramJson.pageIndex;
        delete paramJson.getType;
        console.log(pageSize,pageIndex,paramJson);
        let sendData = {};
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
            common.deleteEmptyProperty(searchJson);
            console.log(searchJson,pageIndex,pageSize);
            let ModelData = null;
            switch (parseInt(getJsonType,10)){
                case 0:
                    ModelData = CustomerModel;//获取用户数据列表
                    break;
                case 1:
                    ModelData = AuditModel;//获取用户审核列表
                    break;
                case 2:
                    ModelData = FeedbackModel;//获取反馈列表
                    break;
                case 3:
                    ModelData = InformModel;//获取举报列表
                    break;
                case 4:
                    ModelData = BlacklistModel;//获取黑名单列表
                    break;
            }
             ModelData.paginate((searchJson), { page: parseInt(pageIndex), limit: parseInt(pageSize) }, function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'获取用户参数有误',
                        data:'NO DATA',
                        code:0,
                        responsePk:0
                     });
                }else{
                    if(data.docs){
                        console.log(data.total);
                        sendData = responseData.createResponseData({
                            message:'获取列表成功',
                            data:JSON.parse(common.toHump(JSON.stringify(data.docs))),
                            code:1,
                            count:data.total,
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
        let paramJson =  JSON.parse(req.body.paramJson);
        let sendData = {};
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
            let customerId = paramJson.customerId;
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
                        let updateState = paramJson.updateState;
                        let dateStr = dtime().format('YYYY-MM-DD HH:mm:ss');
                        CustomerModel.update({'customer_id':customerId},{customer_account_status: updateState,'update_time':dateStr}, {multi: false}, function(error, docs){
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
                                    let returnDes = '';
                                    let sendResponseData =(resData,des)=>{
                                        sendData = responseData.createResponseData({
                                            message:des,
                                            data:resData,
                                            code:4,
                                            responsePk:customerId
                                        });
                                        res.send(sendData);
                                    };
                                    //0注册，3拉黑，但凡被拉黑的用户都要重新回归到注册状态重新认证
                                    switch (parseInt(updateState,10)){
                                        case 0:
                                            returnDes = '用户已激活';
                                            BlacklistModel.update({'customer_id':customerId},{'black_state':1,'update_time':dateStr},{multi: false},function(err,data){
                                                if(err){
                                                    sendResponseData('NO DATA','激活失败');
                                                }else{
                                                    if(data){
                                                        sendResponseData(JSON.parse(JSON.stringify(data)),'激活失败');
                                                    }else{
                                                        sendResponseData('NO DATA','激活失败');
                                                    }
                                                }

                                            });
                                            break;
                                        case 3:
                                            returnDes = '认证已驳回';
                                            break;
                                        case 4:
                                            let timestamp = (new Date()).getTime();
                                            let reason = paramJson.blackReason;
                                            let blackJson = {
                                                black_id:timestamp,//该拉黑的唯一标识
                                                customer_id:customerId,//拉黑用户的id
                                                customer_name:docs.customer_name,//拉黑用户的名字
                                                black_reason:reason,//拉黑的原因
                                                relate_customer_id:String,//举报该用户致使拉黑的用户id
                                                relate_customer_name:String,//举报该用户致使拉黑的用户名字
                                                black_state:String,//拉黑的状态，0新建，1激活
                                                create_time:String,//创建拉黑的时间
                                                admin_id:String,//拉黑该用户的id
                                                admin_name:String,//拉黑该用户的名字
                                                update_time:String//无效拉黑的时间
                                            };
                                            returnDes = '用户已拉黑';
                                            break;
                                    }
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