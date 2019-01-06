import Mock from 'mockjs';
import MessageModel from '../../../schemas/message/message.js';
class Message{
    constructor(){

    }
    async createMessage(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                  id:'@id',//消息的唯一标识
                  from: '@id',     //消息来源
                  "is_valid|1": true,
                  message_related_scene: '@id',
                  message_title: '@title',   //消息的标题
                  message_content: '@cparagraph', //消息的内容
                  "message_type | 1": [0, 1, 2],    //消息的类型
                  to: '@id',//使用过该消息的用户id
                  create_time:'@datetime()',//该消息创建的时间
                  update_time:'@datetime()', //最近被关联的时间
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = MessageModel.findOne({'inform_id':data.dataList[i]['inform_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                          MessageModel.create(data.dataList[i],function(error){
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
        await saveCustomerData();
        if(sumNum==data.dataList.length){
            res.send({
                message:'保存完成'
            });
        }
    }
}
export default new Message();
