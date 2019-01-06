import common from '../../utils/common';
import responseData from '../../utils/responseData';
import siteSideModel from '../../schemas/siteSide/siteSide.js';
class aSide {
    constructor() {
        this.createSide = this.createSide.bind(this);
    }
    async  createSide(req,res,next) {
        
            let t  = this;
            let paramJson =  JSON.parse(req.body.paramJson);
            let sendData = {};
            if(common.isEmptyObject(paramJson)||common.isNothing(paramJson)){
                //传入的是空对象或者没有传值
                sendData = responseData.createResponseData({
                    message:'添加侧边栏失败',
                    data:'NO DATA',
                    code:0,
                    responsePk:0
                });
                res.send(sendData);
            }else{
                let sideTitle = paramJson.sideTitle;
                const  admin = siteSideModel.findOne({'side_title':sideTitle},function(error,sideInfo){
                    if(error){
                        sendData = responseData.createResponseData({
                            message:'添加侧边栏失败',
                            data:'NO DATA',
                            code:0,
                            pk:0
                        });
                        res.send(sendData);
                    }else{
                        if(sideInfo){
                            sendData = responseData.createResponseData({
                                message:'该侧边栏已经存在',
                                data:'NO DATA',
                                code:1,
                                pk:sideInfo.side_id
                            });
                            res.send(sendData);
                        }else{
                            let parentSiteId = paramJson.parentSiteId;

                            let routerModule = paramJson.routerModule;

                            let zIndex = paramJson.zIndex;
                            let adminId = paramJson.adminId;
                            let adminName = paramJson.adminName;

                            let sideClassName = paramJson.sideClassName;
                            let timestamp = (new Date()).getTime();
                            let dt = new Date();
                            let datestr = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
                            let addSideOnOff = parseInt(zIndex,10)===0?sideTitle.length&&sideClassName.length&&zIndex.length&&parentSiteId.length&&routerModule.length:sideTitle.length&&sideClassName.length&&zIndex.length&&routerModule.length;
                            console.log(addSideOnOff);
                            if(addSideOnOff){
                                const newAdmin = {
                                    side_id:timestamp,//该侧边栏的唯一标识
                                    side_title:sideTitle,//侧边栏标题
                                    side_class_name:sideClassName,//侧边栏的iconClass
                                    admin_id:adminId,
                                    admin_name:adminName,
                                    create_time:datestr,//创建侧边栏的时间
                                    z_index:zIndex,//层级
                                    parent_site_id:parentSiteId,//父层侧边栏id
                                    router_module:routerModule,//路由模块名字
                                    is_valid:'1',//0无效，1有效
                                    update_time:datestr//操作侧边栏的最新时间
                                };
                                siteSideModel.create(newAdmin);
                                req.session.admin_id = admin.id;
                                sendData = responseData.createResponseData({
                                    message:'添加成功',
                                    data:{
                                        sideId:timestamp,
                                        sideTitle:sideTitle,
                                        createTime:datestr
                                    },
                                    code:4,//添加成功
                                    pk:timestamp
                                });
                                res.send(sendData);
                            }else{
                                sendData = responseData.createResponseData({
                                    message:'添加失败',
                                    data:'NO DATA',
                                    code:5,//添加成功
                                    pk:0
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
            let ModelData = siteSideModel;
            ModelData.paginate((searchJson), { page: parseInt(pageIndex), limit: parseInt(pageSize) }, function(error,data){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'获取参数有误',
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
}
export default  new aSide();