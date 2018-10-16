import Mock from 'mockjs';
import AttachmentModel from '../../../schemas/attachment/attachment.js';
import AuditModel from '../../../schemas/audit/audit.js';
class Attachment{
    constructor(){

    }
    async createBlackCustomer(req,res,next){
        let t = this;
        let arrList = [];
        AuditModel.find({},function(error,data){
            console.log(data);
           if(error){
               res.send({
                   message:'生成失败'
               });
           }else{
               if(data){
                   arrList = [];
                   for(let num = 0;num<data.length;num++){
                       let pArr = data[num]['profession_attachment'].split(',');
                       let sArr = data[num]['school_attachment'].split(',');
                       let iArr = data[num]['identity_attachment'].split(',');
                       let dArr = data[num]['degree_attachment'].split(',');
                       let oArr = data[num]['other_attachment'].split(',');
                       let cid = data[num]['customer_id'];
                       for(let p = 0;p<pArr.length;p++){
                           const dataItem = Mock.mock({
                               'dataList|1':[
                                   {
                                       attachment_id:pArr[p],//该附件的唯一标识
                                       'attachment_type':'6',//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
                                       attachment_link:"@image('383x265', '#894FC4', '#FFF', 'png','demo')",//管理员姓名
                                       'is_valid|1':['0','1'],//附件目前的状态，0无效,1有效
                                       customer_id:cid,//该附件所属的用户
                                       create_time:'@datetime()',//管理员身份证号
                                       update_time:'@datetime()',//管理员身份证号
                                       'attachment_number|100000000-999999999':1,//附件相关的号码
                                       attachment_remark: '@ctitle(22)'//附件备注信息
                                   }
                               ]
                           });
                           arrList.push(dataItem['dataList']);
                       }
                       for(let s = 0;s<sArr.length;s++){
                           const dataItem = Mock.mock({
                               'dataList|1':[
                                   {
                                       attachment_id:sArr[s],//该附件的唯一标识
                                       'attachment_type':'3',//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
                                       attachment_link:"@image('383x265', '#894FC4', '#FFF', 'png','demo')",//管理员姓名
                                       'is_valid|1':['0','1'],//附件目前的状态，0无效,1有效
                                       customer_id:cid,//该附件所属的用户
                                       create_time:'@datetime()',//管理员身份证号
                                       update_time:'@datetime()',//管理员身份证号
                                       'attachment_number|100000000-999999999':1,//附件相关的号码
                                       attachment_remark: '@ctitle(22)'//附件备注信息
                                   }
                               ]
                           });
                           arrList.push(dataItem['dataList']);
                       }
                       for(let i = 0;i<iArr.length;i++){
                           const dataItem = Mock.mock({
                               'dataList|1':[
                                   {
                                       attachment_id:iArr[i],//该附件的唯一标识
                                       'attachment_type':'4',//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
                                       attachment_link:"@image('383x265', '#894FC4', '#FFF', 'png','demo')",//管理员姓名
                                       'is_valid|1':['0','1'],//附件目前的状态，0无效,1有效
                                       customer_id:cid,//该附件所属的用户
                                       create_time:'@datetime()',//管理员身份证号
                                       update_time:'@datetime()',//管理员身份证号
                                       'attachment_number|100000000-999999999':1,//附件相关的号码
                                       attachment_remark: '@ctitle(22)'//附件备注信息
                                   }
                               ]
                           });
                           arrList.push(dataItem['dataList']);
                       }
                       for(let d = 0;d<dArr.length;d++){
                           const dataItem = Mock.mock({
                               'dataList|1':[
                                   {
                                       attachment_id:dArr[d],//该附件的唯一标识
                                       'attachment_type':'2',//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
                                       attachment_link:"@image('383x265', '#894FC4', '#FFF', 'png','demo')",//管理员姓名
                                       'is_valid|1':['0','1'],//附件目前的状态，0无效,1有效
                                       customer_id:cid,//该附件所属的用户
                                       create_time:'@datetime()',//管理员身份证号
                                       update_time:'@datetime()',//管理员身份证号
                                       'attachment_number|100000000-999999999':1,//附件相关的号码
                                       attachment_remark: '@ctitle(22)'//附件备注信息
                                   }
                               ]
                           });
                           arrList.push(dataItem['dataList']);
                       }
                       for(let o = 0;o<oArr.length;o++){
                           const dataItem = Mock.mock({
                               'dataList|1':[
                                   {
                                       attachment_id:oArr[o],//该附件的唯一标识
                                       'attachment_type':'7',//用户相关信息附件，0头像，1背景图，2学位证，3学历证，4身份证，5个人写真，6工作相关证件7其他认证资料8举报附件
                                       attachment_link:"@image('383x265', '#894FC4', '#FFF', 'png','demo')",//管理员姓名
                                       'is_valid|1':['0','1'],//附件目前的状态，0无效,1有效
                                       customer_id:cid,//该附件所属的用户
                                       create_time:'@datetime()',//管理员身份证号
                                       update_time:'@datetime()',//管理员身份证号
                                       'attachment_number|100000000-999999999':1,//附件相关的号码
                                       attachment_remark: '@ctitle(22)'//附件备注信息
                                   }
                               ]
                           });
                           arrList.push(dataItem['dataList']);
                       }
                   }
                   let sumNum = 0;
                   let  saveCustomerData = ()=>{
                       for(let i = 0;i<arrList.length;i++){
                           // console.log(data.dataList[i]['customer_nickname']);
                           const customer = AttachmentModel.findOne({'attachment_id':arrList[i]['attachment_id']},function(error,userInfo){
                               //console.log('执行',error);
                               if(error){
                                   console.log('报错了');
                               }else{
                                   //console.log(userInfo);
                                   if(!userInfo){
                                       //console.log('存储数据',data.dataList[i]);
                                       AttachmentModel.create(arrList[i],function(error){
                                           if(error){
                                               console.log('存储失败');
                                           }
                                       });
                                   }
                               }
                           })
                           sumNum++;
                       }
                   }
                   saveCustomerData();
                   if(sumNum==arrList.length){
                       res.send({
                           message:'保存完成'
                       });
                   }
               }else{
                   res.send({
                       message:'生成失败'
                   });
               }
           }
        });
    }
}
export default new Attachment();