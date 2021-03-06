import common from '../../utils/common';
import responseData from '../../utils/responseData';
import TemplateModel from '../../schemas/template/template.js';
require('date-utils');
class Template{
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
            let ModelData = TemplateModel;
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
    async changeTemplateState(req,res,next){
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
            let TemplateId = paramJson.templateId;
            TemplateModel.findOne({'template_id':TemplateId},function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'查询模板失败',
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
                        TemplateModel.update({'template_id':TemplateId},{$set:{is_valid: updateState,'update_time':dateStr}}, function(error, docs){
                            console.log(error,docs);
                            if(error){
                                sendData = responseData.createResponseData({
                                    message:'更新状态失败',
                                    data:'NO DATA',
                                    code:2,
                                    responsePk:TemplateId
                                });
                                res.send(sendData);
                            }else{
                                if(docs){
                                    let sendResponseData =(resData,des)=>{
                                        sendData = responseData.createResponseData({
                                            message:des,
                                            data:resData,
                                            code:3,
                                            responsePk:TemplateId
                                        });
                                        res.send(sendData);
                                    };
                                    switch (parseInt(updateState,10)){
                                        case 1:
                                            sendResponseData(docs,'模板已激活');
                                            break;
                                        case 0:
                                            sendResponseData(docs,'模板已无效');
                                            break;
                                    }
                                }else{
                                    sendData = responseData.createResponseData({
                                        message:'更新状态失败',
                                        data:'NO DATA',
                                        code:2,
                                        responsePk:TemplateId
                                    });
                                    res.send(sendData);
                                }
                            }
                        })
                    }else{
                        sendData = responseData.createResponseData({
                            message:'该模板不存在',
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
    async updateTemplate(req,res,next) {
        let t = this;
        let paramJson = JSON.parse(req.body.paramJson);
        let sendData = {};
        if (common.isEmptyObject(paramJson) || common.isNothing(paramJson)) {
            //传入的是空对象或者没有传值
            sendData = responseData.createResponseData({
                message: '参数有误',
                data: 'NO DATA',
                code: 0,
                responsePk: 0
            });
            res.send(sendData);
        } else {
            let TemplateId = paramJson.templateId;
            TemplateModel.findOne({'template_id': TemplateId}, function (error, data) {
                if (error) {
                    sendData = responseData.createResponseData({
                        message: '查询模板失败',
                        data: 'NO DATA',
                        code: 1,
                        responsePk: 0
                    });
                    res.send(sendData);
                } else {
                    console.log(data);
                    if (data) {
                        let templateContent = paramJson.templateContent;
                        let templateTitle = paramJson.templateTitle;
                        let dateStr = dtime().format('YYYY-MM-DD HH:mm:ss');
                        TemplateModel.update({'template_id': TemplateId}, {
                            $set: {
                                'template_content': templateContent,
                                'template_title': templateTitle,
                                'update_time': dateStr
                            }
                        }, function (error, docs) {
                            console.log(error, docs);
                            if (error) {
                                sendData = responseData.createResponseData({
                                    message: '更新模板失败',
                                    data: 'NO DATA',
                                    code: 2,
                                    responsePk: TemplateId
                                });
                                res.send(sendData);
                            } else {
                                if (docs) {
                                    let sendResponseData = (resData, des) => {
                                        sendData = responseData.createResponseData({
                                            message: des,
                                            data: resData,
                                            code: 3,
                                            responsePk: TemplateId
                                        });
                                        res.send(sendData);
                                    };
                                    sendResponseData(docs, '模板已更新成功');
                                } else {
                                    sendData = responseData.createResponseData({
                                        message: '更新模板失败',
                                        data: 'NO DATA',
                                        code: 2,
                                        responsePk: TemplateId
                                    });
                                    res.send(sendData);
                                }
                            }
                        })
                    } else {
                        sendData = responseData.createResponseData({
                            message: '该模板不存在',
                            data: 'NO DATA',
                            code: 2,
                            responsePk: 0
                        });
                        res.send(sendData);
                    }
                }
            });
        }
    }

}
export default  new Template();