import common from '../../utils/common';
import responseData from '../../utils/responseData';
import RecommendModel from '../../schemas/recommend/recommend.js';
require('date-utils');
class Recommend{
    constructor(){
        this.getJsonList = this.getJsonList.bind(this);
    }
    getJsonList(req,res,next){
        let t = this;
        let paramJson =  req.query;
        let pageSize = paramJson.pageSize;
        let pageIndex = paramJson.pageIndex;
        delete paramJson.pageSize;
        delete paramJson.pageIndex;
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
            const searchJson = JSON.parse(common.toLine(JSON.stringify(paramJson)));
            common.deleteEmptyProperty(searchJson);
            let ModelData = RecommendModel;
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
                        sendData = responseData.createResponseData({
                            message:'获取列表成功',
                            data:common.toHump(data.docs),
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
    async changeRecommendState(req,res,next){
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
            let RecommendId = paramJson.recommendId;
            RecommendModel.findOne({'recommend_id':RecommendId},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'查询推送失败',
                        data:'NO DATA',
                        code:1,
                        responsePk:0
                    });
                    res.send(sendData);
                }else{
                    if(data){
                        let updateState = paramJson.updateState;
                        let dt = new Date();
                        let dateStr = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
                        RecommendModel.update({'recommend_id':RecommendId},{$set:{is_valid: updateState,'update_time':dateStr}}, function(error, docs){
                            console.log(error,docs);
                            if(error){
                                sendData = responseData.createResponseData({
                                    message:'更新状态失败',
                                    data:'NO DATA',
                                    code:2,
                                    responsePk:RecommendId
                                });
                                res.send(sendData);
                            }else{
                                if(docs){
                                    let sendResponseData =(resData,des)=>{
                                        sendData = responseData.createResponseData({
                                            message:des,
                                            data:resData,
                                            code:3,
                                            responsePk:RecommendId
                                        });
                                        res.send(sendData);
                                    };
                                    switch (parseInt(updateState,10)){
                                        case 1:
                                            sendResponseData(docs,'推送已激活');
                                            break;
                                        case 0:
                                            sendResponseData(docs,'推送已无效');
                                            break;
                                    }
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'更新状态失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:RecommendId
                                    });
                                    res.send(sendData);
                                }
                            }
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'该推送不存在',
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
    async changeRecommendInfo(req,res,next){
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
            let RecommendId = paramJson.recommendId;
            RecommendModel.findOne({'recommend_id':RecommendId},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'查询推送失败',
                        data:'NO DATA',
                        code:1,
                        responsePk:0
                    });
                    res.send(sendData);
                }else{
                    console.log(data);
                    if(data){
                        let dt = new Date();
                        let dateStr = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
                        common.deleteEmptyProperty(paramJson);
                        const updateJson = JSON.parse(common.toLine(JSON.stringify(paramJson)));
                        RecommendModel.update({'recommend_id':RecommendId},{$set:updateJson}, function(error, docs){
                            console.log(error,docs);
                            if(error){
                                sendData = responseData.createResponseData({
                                    message:'更新状态失败',
                                    data:'NO DATA',
                                    code:2,
                                    responsePk:RecommendId
                                });
                                res.send(sendData);
                            }else{
                                if(docs){
                                    let sendResponseData =(resData,des)=>{
                                        sendData = responseData.createResponseData({
                                            message:des,
                                            data:resData,
                                            code:3,
                                            responsePk:RecommendId
                                        });
                                        let errSendData = responseData.createResponseData({
                                            message:'更新状态失败',
                                            data:'NO DATA',
                                            code:2,
                                            responsePk:RecommendId
                                        });
                                        RecommendModel.update({'recommend_id':RecommendId},{$set:{update_time:dateStr}}, function(errorSecond, docsSecond){
                                            if(errorSecond){
                                                res.send(errSendData);
                                            }else{
                                                if(docsSecond){
                                                    res.send(sendData);
                                                }else{
                                                    res.send(errSendData);
                                                }
                                            }
                                        });

                                    };
                                    sendResponseData(docs,'推送已更改');
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'更新状态失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:RecommendId
                                    });
                                    res.send(sendData);
                                }
                            }
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'该推送不存在',
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
export default  new Recommend();