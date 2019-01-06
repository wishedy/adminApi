import common from '../../utils/common';
import responseData from '../../utils/responseData';
import columnModel from '../../schemas/column/column.js';
const nanoid = require('nanoid');
class column {
    constructor() {
        this.createColumn = this.createColumn.bind(this);
        this.getJsonList = this.getJsonList.bind(this);
    }
    async  createColumn(req,res,next) {
        let t  = this;
        let paramJson =  JSON.parse(req.body.paramJson);
        let sendData = {};
        if(common.isEmptyObject(paramJson)||common.isNothing(paramJson)){
            //传入的是空对象或者没有传值
            sendData = responseData.createResponseData({
                message:'参数有误',
                data:'NO DATA',
                code:0,
                responsePk:0,
                status:false
            });
            res.send(sendData);
        }else{
            let columnTitle = paramJson.columnTitle;
            const  admin = columnModel.findOne({'column_title':columnTitle},function(error,columnInfo){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'添加失败',
                        data:'NO DATA',
                        code:1,
                        pk:0,
                        status:false
                    });
                    res.send(sendData);
                }else{
                    if(columnInfo){
                        sendData = responseData.createResponseData({
                            message:'该栏目已经存在',
                            data:'NO DATA',
                            code:2,
                            pk:columnInfo.column_id,
                            status:false
                        });
                        res.send(sendData);
                    }else{
                        let parentSiteId = paramJson.parentColumnId;

                        let routerModule = paramJson.columnRouterName;

                        let zIndex = paramJson.columnIndex;
                        let adminId = paramJson.adminId;
                        let icon_id = paramJson.iconId;
                        let timestamp = nanoid();
                        let dt = new Date();
                        let datestr = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
                        let addSideOnOff = parseInt(zIndex,10)===0?columnTitle.length&&icon_id.length&&zIndex.length&&routerModule.length:columnTitle.length&&icon_id.length&&parentSiteId.length&&zIndex.length&&routerModule.length;
                        if(addSideOnOff){
                            const newAdmin = {
                                column_id:timestamp,//该侧边栏的唯一标识
                                column_title:columnTitle,//侧边栏标题
                                icon_id:icon_id,//侧边栏的iconClass
                                admin_id:adminId,
                                create_time:datestr,//创建侧边栏的时间
                                column_index:zIndex,//层级
                                parent_column_id:parentSiteId,//父层侧边栏id
                                column_router_name:routerModule,//路由模块名字
                                is_valid:'1',//0无效，1有效
                                update_time:datestr//操作侧边栏的最新时间
                            };
                            columnModel.create(newAdmin);
                            sendData = responseData.createResponseData({
                                message:'添加成功',
                                data:{
                                    column_id:timestamp,
                                    columnTitle:columnTitle,
                                    createTime:datestr
                                },
                                code:3,//添加成功
                                pk:timestamp,
                                status:false
                            });
                            res.send(sendData);
                        }else{
                            sendData = responseData.createResponseData({
                                message:'添加失败',
                                data:'NO DATA',
                                code:4,//添加成功
                                pk:0,
                                status:false
                            });
                            res.send(sendData);
                        }
                    }

                }
            });
        }
    }
    getJsonList(req,res,next){
        let t = this;
        let paramJson =  req.query;
        let pageSize = paramJson.pageSize;
        let pageIndex = paramJson.pageIndex;
        paramJson.createDuringTime = JSON.parse(paramJson.createDuringTime);
        paramJson.updateDuringTime = JSON.parse(paramJson.updateDuringTime);
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
            const searchJson = common.toLine(paramJson);
            common.deleteEmptyProperty(searchJson);
            const searchData = common.duringTime(searchJson);
            let ModelData = columnModel;
            ModelData.paginate((searchData), { page: parseInt(pageIndex), limit: parseInt(pageSize) }, function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'参数有误',
                        data:'NO DATA',
                        code:0,
                        count:0,
                        responsePk:0
                    });
                }else{
                    if(data.docs){
                        sendData = responseData.createResponseData({
                            message:'获取列表成功',
                            data:common.toHump(common.jsonToArr(data.docs)),
                            code:1,
                            count:data.total,
                            responsePk:0
                        });
                    }else{
                        sendData = responseData.createResponseData({
                            message:'获取列表失败',
                            data:'NO DATA',
                            code:0,
                            count:0,
                            responsePk:0
                        });
                    }
                }
                res.send(sendData);
            });
        }
    }
}
export default  new column();