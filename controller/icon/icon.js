import common from '../../utils/common';
import responseData from '../../utils/responseData';
import iconModel from '../../schemas/icon/icon.js';
const nanoid = require('nanoid');
class icon {
    constructor() {
        this.createIcon = this.createIcon.bind(this);
        this.getJsonList = this.getJsonList.bind(this);
    }
    async  createIcon(req,res,next) {
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
            let iconName = paramJson.iconName;
            const  admin = iconModel.findOne({'icon_name':iconName},function(error,iconInfo){
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
                    if(iconInfo){
                        sendData = responseData.createResponseData({
                            message:'已经存在',
                            data:'NO DATA',
                            code:2,
                            pk:iconInfo.icon_id,
                            status:false
                        });
                        res.send(sendData);
                    }else{

                        let iconName = paramJson.iconName;
                        let adminId = paramJson.adminId;
                        let timestamp = nanoid();
                        let dt = new Date();
                        let datestr = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
                            const newAdmin = {
                                icon_id:timestamp,//该侧边栏的唯一标识
                                icon_name:iconName,//侧边栏标题
                                admin_id:adminId,
                                create_time:datestr//创建侧边栏的时间
                            };
                            iconModel.create(newAdmin);
                            sendData = responseData.createResponseData({
                                message:'添加成功',
                                data:{
                                    iconId:timestamp,
                                    iconTitle:iconName,
                                    createTime:datestr
                                },
                                status:true,
                                code:3,//添加成功
                                pk:timestamp
                            });
                            res.send(sendData);

                    }

                }
            });
        }
    }
    getJsonList(req,res,next){
        let t = this;
        let sendData = {};
        let ModelData = iconModel;
        ModelData.paginate(({}), { page: 1, limit: 100000 }, function(error,data){
            if(error){
                sendData = responseData.createResponseData({
                    message:'参数有误',
                    data:'NO DATA',
                    code:0,
                    count:0,
                    responsePk:0,
                    status:false
                });
            }else{
                if(data.docs){
                    sendData = responseData.createResponseData({
                        message:'获取列表成功',
                        data:common.toHump(common.jsonToArr(data.docs)),
                        code:1,
                        count:data.total,
                        responsePk:0,
                        status:true
                    });
                }else{
                    sendData = responseData.createResponseData({
                        message:'获取列表失败',
                        data:'NO DATA',
                        code:0,
                        count:0,
                        responsePk:0,
                        status:false
                    });
                }
            }
            res.send(sendData);
        });
    }
}
export default  new icon();