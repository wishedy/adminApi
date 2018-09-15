import Mock from 'mockjs';
import CustomerModel from '../../../schemas/customer/customer.js';
 class Customer{
     constructor(){

     }
     async createCustomer(req,res,next){
        const data = Mock.mock({
            'dataList|30':[
                {
                    'customer_id':'@datetime(T)',
                    'customer_family_id':'@datetime(T)',
                    'customer_profession':"@ctitle(8)",
                    'customer_account_status|1':['0', '1','2','3','4'],
                    'customer_sex|1':['0','1'],
                    'customer_education':'@ctitle(8)',
                    'customer_degree|1':['0','1','2','3'],
                    'customer_phone_num':/^1[3578]\d{9}$/,
                    'customer_email':"@email()",
                    'customer_weight|100-200':1,
                    'customer_height|155-200':1,
                    'customer_active_vaule|100-999':1,
                    'customer_emolument|10000-30000':1,
                    'customer_house':'@ctitle(8)',
                    'customer_car':'@ctitle(8)',
                    'customer_pass_word':'@string("lower", 10, 16)',
                    'customer_wechat':'@ctitle(8)',
                    'customer_qq_account|100000000-999999999':1,
                    'customer_read_me':'@ctitle(22)',
                    'attachment_id_list':'@datetime(T)',  
                    'customer_write_you':'@ctitle(22)',                    
                    'customer_birthday':'@date("yyyy-MM-dd")',
                    'update_time':'@datetime()',
                    'registerTime':'@datetime()',
                    'interest_list':'@datetime(T)',                
                    'create_time': '@datetime()',
                    'customer_nickname': '@cname',
                    'comment_me_num|100-999':1,
                    'like_me_num|100-999':1,
                    'message_me_num|100-999':1,
                    'customer_name':"@cname",
                    'admin_name':"@cname",
                    'customer_home': '@province' + '@city',
                    'customer_location': '@province' + '@city'
                }
            ]
         }); 
         let sumNum = 0;
         let  saveCustomerData = ()=>{
            for(let i = 0;i<data.dataList.length;i++){
               // console.log(data.dataList[i]['customer_nickname']);
                const customer = CustomerModel.findOne({'customer_id':data.dataList[i]['customer_id']},function(error,userInfo){
                   //console.log('执行',error); 
                   if(error){
                        console.log('报错了');
                    }else{
                        //console.log(userInfo);
                        if(!userInfo){
                            //console.log('存储数据',data.dataList[i]);
                           CustomerModel.create(data.dataList[i],function(error){
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
 export default new Customer();