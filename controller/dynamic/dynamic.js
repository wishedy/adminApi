import common from '../../utils/common';
import responseData from '../../utils/responseData';
import DynamicModel from '../../schemas/dynamic/dynamic.js';
require('date-utils');
class Dynamic{
    constructor(){
        this.getJsonList = this.getJsonList.bind(this);
    }
    getJsonList(req,res,next){
        let t = this;

        let paramJson =  req.query;
        let pageSize = paramJson.pageSize;
        let pageIndex = paramJson.pageIndex;
        //console.log('操作');
        delete paramJson.pageSize;
        delete paramJson.pageIndex;
        //console.log(pageSize,pageIndex,paramJson);
        let sendData = {};
        //console.log(paramJson);
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
            //console.log(searchJson,pageIndex,pageSize);
            let ModelData = DynamicModel;
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
                        console.log(data.docs);
                        //console.log(data.total);
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
    async changeDynamicState(req,res,next){
        let t = this;
        let paramJson =  JSON.parse(req.body.paramJson);
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
            let dynamicId = paramJson.dynamicId;
            DynamicModel.findOne({'dynamic_id':dynamicId},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'查询动态失败',
                        data:'NO DATA',
                        code:1,
                        responsePk:0
                    });
                    res.send(sendData);
                }else{
                    console.log(data);
                    if(data){
                        let updateState = paramJson.updateState;
                        let dt = new Date();
                        let dateStr = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
                        DynamicModel.update({'dynamic_id':dynamicId},{$set:{is_valid: updateState,'update_time':dateStr}}, function(error, docs){
                            console.log(error,docs);
                            if(error){
                                sendData = responseData.createResponseData({
                                    message:'更新状态失败',
                                    data:'NO DATA',
                                    code:2,
                                    responsePk:dynamicId
                                });
                                res.send(sendData);
                            }else{
                                if(docs){
                                    let sendResponseData =(resData,des)=>{
                                        sendData = responseData.createResponseData({
                                            message:des,
                                            data:resData,
                                            code:3,
                                            responsePk:dynamicId
                                        });
                                        res.send(sendData);
                                    };
                                    switch (parseInt(updateState,10)){
                                        case 1:
                                            sendResponseData(docs,'动态已激活');
                                            break;
                                        case 0:
                                            sendResponseData(docs,'动态已无效');
                                            break;
                                    }
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'更新状态失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:dynamicId
                                    });
                                    res.send(sendData);
                                }
                            }
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'该动态不存在',
                            data:'NO DATA',
                            code:2,
                            responsePk:0
                        });
                        res.send(sendData);
                    }
                }
            });
        }
    }

}
export default  new Dynamic();