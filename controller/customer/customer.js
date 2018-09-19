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
            let adminId = paramJson.adminId;
            let adminName = paramJson.adminName;
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
                                            let blackId = paramJson.blackId;
                                            BlacklistModel.update({'black_id':blackId},{'unlock_admin_id':adminId,'unlock_admin_name':adminName,'black_state':1,'update_time':dateStr},{multi: false},function(err,data){
                                                if(err){
                                                    sendResponseData('NO DATA','激活失败');
                                                }else{
                                                    if(data){
                                                        sendResponseData(JSON.parse(JSON.stringify(data)),returnDes);
                                                    }else{
                                                        sendResponseData('NO DATA','激活失败');
                                                    }
                                                }

                                            });
                                            break;
                                        case 3:
                                            let auditId = paramJson.auditId;
                                            returnDes = '认证已驳回';
                                            AuditModel.update({'audit_id':auditId},{'audit_result':0,'audit_type':1,'admin_name':adminName,'admin_id':adminId,'update_time':dateStr},{multi: false},function(err,data){
                                                if(err){
                                                    sendResponseData('NO DATA','更改状态失败');
                                                }else{
                                                    if(data){
                                                        sendResponseData(JSON.parse(JSON.stringify(data)),returnDes);
                                                    }else{
                                                        sendResponseData('NO DATA','更改状态失败');
                                                    }
                                                }
                                            });
                                            break;
                                        case 4:
                                            let timestamp = (new Date()).getTime();
                                            let reason = paramJson.blackReason;
                                            let relateCustomerId = paramJson.reportCustomerId;
                                            let relateCustomerName = paramJson.reportCustomerName;
                                            let blackJson = {
                                                black_id:timestamp,//该拉黑的唯一标识
                                                customer_id:customerId,//拉黑用户的id
                                                customer_name:docs.customer_name,//拉黑用户的名字
                                                black_reason:reason,//拉黑的原因
                                                relate_customer_id:relateCustomerId,//举报该用户致使拉黑的用户id
                                                relate_customer_name:relateCustomerName,//举报该用户致使拉黑的用户名字
                                                black_state:0,//拉黑的状态，0新建，1激活
                                                create_time:dateStr,//创建拉黑的时间
                                                admin_id:adminId,//拉黑该用户的id
                                                admin_name:adminName,//拉黑该用户的名字
                                                update_time:dateStr//无效拉黑的时间
                                            };
                                            returnDes = '用户已拉黑';
                                            BlacklistModel.create(blackJson,function(err,info){
                                                if(error){
                                                    sendResponseData('NO DATA','拉黑失败');
                                                }else{
                                                    if(info){
                                                        sendResponseData(JSON.parse(JSON.stringify(info)),returnDes);
                                                    }else{
                                                        sendResponseData('NO DATA','拉黑失败');
                                                    }
                                                }
                                            });
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
    async replyToReport(req,res,next){
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
            let inform_id = paramJson.informId;
            let inform_admin_name = paramJson.informAdminName;
            let inform_admin_content = paramJson.informAdminContent;
            let inform_admin_id = paramJson.informAdminId;
            InformModel.findOne({'inform_id':inform_id},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'参数有误',
                        data:'NO DATA',
                        code:0,
                        responsePk:0
                    });
                    res.send(sendData);
                }else{
                    if(data){
                        let dateStr = dtime().format('YYYY-MM-DD HH:mm:ss');
                        InformModel.update({'inform_id':inform_id},{'inform_admin_name':inform_admin_name,'inform_admin_content':inform_admin_content,'inform_admin_id':inform_admin_id,'update_time':dateStr},function(err,info){
                            if(err){
                                sendData = responseData.createResponseData({
                                    message:'回复举报失败',
                                    data:'NO DATA',
                                    code:2,
                                    responsePk:inform_id
                                });
                            }else{
                                if(info){
                                    sendData = responseData.createResponseData({
                                        message:'回复举报失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:inform_id
                                    });
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'回复举报成功',
                                        data:info,
                                        code:3,
                                        responsePk:inform_id
                                    });
                                }
                            }
                            res.send(sendData);
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'参数有误',
                            data:'NO DATA',
                            code:0,
                            responsePk:0
                        });
                        res.send(sendData);
                    }
                }
            })
        }
    }
    async reportCustomer(req,res,next){
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
            let inform_content = paramJson.informContent;
            let customer_name = paramJson.customerName;
            let customer_id = paramJson.customerId;
            let inform_attachment_id_list = paramJson.informAttachmentIdList;
            let inform_customer_nickname = paramJson.informCustomerNickname;
            let inform_customer_name = paramJson.informCustomerNname;
            if((inform_attachment_id_list.length==0)&&(inform_content.length==0)&&(inform_customer_nickname.length==0)&&(inform_customer_name.length==0)){
                //传入的是空对象或者没有传值
                sendData = responseData.createResponseData({
                    message:'参数有误',
                    data:'NO DATA',
                    code:0,
                    responsePk:0
                });
                res.send(sendData);
            }else{
                let timestamp = (new Date()).getTime();
                let dateStr = dtime().format('YYYY-MM-DD HH:mm:ss');
                CustomerModel.findOne({'customer_name':inform_customer_name,'customer_nickname':inform_customer_nickname},function(error,data){
                    if(error){
                        sendData = responseData.createResponseData({
                            message:'该用户不存在',
                            data:'NO DATA',
                            code:1,
                            responsePk:0
                        });
                        res.send(sendData);
                    }else{
                        if(data){
                            let reportData = {
                                inform_id:timestamp,//该举报的唯一标识
                                customer_id:customer_id,//举报用户的id
                                customer_name:customer_name,//举报用户的名字
                                inform_content:inform_content,//举报的文字内容
                                inform_state:0,//举报的状态，0新建，1已回复
                                create_time:dateStr,//创建举报的时间
                                inform_customer_id:data.customer_id,//举报的用户的id
                                inform_customer_name:data.customer_name,//被举报的用户的名字
                                inform_customer_nickname:data.customer_nickname,//被举报的用户的昵称
                                inform_attachment_id_list:inform_attachment_id_list,//该举报的相关附件
                                inform_admin_name:'',//回复该举报的管理员名字
                                inform_admin_id:'',//回复该举报的管理员id
                                inform_admin_content:'',//管理员回复该举报的内容
                                update_time:dateStr//回复举报的时间
                            };
                            InformModel.create(reportData,function(err,info){
                                if(err){
                                    sendData = responseData.createResponseData({
                                        message:'举报失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:customer_id
                                    });
                                }else{
                                    if(info){
                                        sendData = responseData.createResponseData({
                                            message:'举报失败',
                                            data:'NO DATA',
                                            code:2,
                                            responsePk:customer_id
                                        });
                                    }else{
                                        sendData = responseData.createResponseData({
                                            message:'举报成功',
                                            data:info,
                                            code:3,
                                            responsePk:customer_id
                                        });
                                    }

                                }
                                res.send(sendData);
                            })
                        }else{
                            sendData = responseData.createResponseData({
                                message:'该用户不存在',
                                data:'NO DATA',
                                code:1,
                                responsePk:0
                            });
                            res.send(sendData);
                        }
                    }

                });

            }

        }
    }
}
export default new Customer();