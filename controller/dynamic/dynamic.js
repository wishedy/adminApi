import common from '../../utils/common';
import responseData from '../../utils/responseData';
import DynamicModel from '../../schemas/dynamic/dynamic.js';
import CustomerModel from "../../schemas/customer/customer";
import AuditModel from "../../schemas/audit/audit";
import FeedbackModel from "../../schemas/feedback/feedback";
import InformModel from "../../schemas/inform/inform";
import BlacklistModel from "../../schemas/blacklist/blacklist";
const dtime = require('time-formater');
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

}
export default  new Dynamic();