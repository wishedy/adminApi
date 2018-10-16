import common from '../../utils/common';
import responseData from '../../utils/responseData';
import TopicModel from '../../schemas/topic/topic.js';
require('date-utils');
class Topic{
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
            let ModelData = TopicModel;
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
    async changeTopicState(req,res,next){
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
            let TopicId = paramJson.topicId;
            TopicModel.findOne({'topic_id':TopicId},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'查询话题失败',
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
                        TopicModel.update({'topic_id':TopicId},{$set:{is_valid: updateState,'update_time':dateStr}}, function(error, docs){
                            console.log(error,docs);
                            if(error){
                                sendData = responseData.createResponseData({
                                    message:'更新状态失败',
                                    data:'NO DATA',
                                    code:2,
                                    responsePk:TopicId
                                });
                                res.send(sendData);
                            }else{
                                if(docs){
                                    let sendResponseData =(resData,des)=>{
                                        sendData = responseData.createResponseData({
                                            message:des,
                                            data:resData,
                                            code:3,
                                            responsePk:TopicId
                                        });
                                        res.send(sendData);
                                    };
                                    switch (parseInt(updateState,10)){
                                        case 1:
                                            sendResponseData(docs,'话题已激活');
                                            break;
                                        case 0:
                                            sendResponseData(docs,'话题已无效');
                                            break;
                                    }
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'更新状态失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:TopicId
                                    });
                                    res.send(sendData);
                                }
                            }
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'该话题不存在',
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
    async changeTopicStatus(req,res,next){
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
            let TopicId = paramJson.topicId;
            TopicModel.findOne({'topic_id':TopicId},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'查询话题失败',
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
                        TopicModel.update({'topic_id':TopicId},{$set:{topic_status: updateState,'update_time':dateStr}}, function(error, docs){
                            console.log(error,docs);
                            if(error){
                                sendData = responseData.createResponseData({
                                    message:'更新状态失败',
                                    data:'NO DATA',
                                    code:2,
                                    responsePk:TopicId
                                });
                                res.send(sendData);
                            }else{
                                if(docs){
                                    let sendResponseData =(resData,des)=>{
                                        sendData = responseData.createResponseData({
                                            message:des,
                                            data:resData,
                                            code:3,
                                            responsePk:TopicId
                                        });
                                        res.send(sendData);
                                    };
                                    switch (parseInt(updateState,10)){
                                        case 2:
                                            sendResponseData(docs,'话题已审核通过');
                                            break;
                                        case 1:
                                            sendResponseData(docs,'话题已驳回');
                                            break;
                                    }
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'更新状态失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:TopicId
                                    });
                                    res.send(sendData);
                                }
                            }
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'该话题不存在',
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
export default  new Topic();