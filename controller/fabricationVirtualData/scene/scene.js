import Mock from 'mockjs';
import SceneModel from '../../../schemas/scene/scene.js';
class Scene{
    constructor(){

    }
    async createInform(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                  id:'@id',
                  title:'@title',
                  'is_valid | 1': true,
                  'icon|1': [0x00, 0x11],
                  'href | 1': ['baidu.com', 'google.com'],
                  create_time:'@datetime()',
                  update_time:'@datetime()'
                }
            ]
        });
        let sumNum = 0;
        let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
                // console.log(data.dataList[i]['customer_nickname']);
                const customer = SceneModel.findOne({'inform_id':data.dataList[i]['inform_id']},function(error,userInfo){
                    //console.log('执行',error);
                    if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                          SceneModel.create(data.dataList[i],function(error){
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
export default new Scene();
