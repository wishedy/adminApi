'use strict';
import common from '../../utils/common';
import responseData from '../../utils/responseData';
const dtime = require('time-formater');
const crypto  = require('crypto');
import AdminModel from '../../schemas/admin/admin.js';
class Admin {
    constructor(){
        this.register = this.register.bind(this);
        this.encryption = this.encryption.bind(this);
    }
    async register(req,res,next){
        let t  = this;
        var paramJson =  JSON.parse(req.body.paramJson);
        var sendData = {};
        if(common.isEmptyObject(paramJson)||common.isNothing(paramJson)){
           //传入的是空对象或者没有传值
             sendData = responseData.createResponseData({
               message:'注册管理员失败',
               data:'NO DATA',
               code:0,
               responsePk:0
            });
           res.send(sendData);
        }else{
            let name = paramJson.registerName;
            let identityNum = paramJson.registerIdentityNum;
            const  admin = AdminModel.findOne({'admin_name':name,'admin_identity_num':identityNum},function(error,userInfo){
                if(error){
                    sendData = responseData.createResponseData({
                        message:'注册管理员失败',
                        data:'NO DATA',
                        code:0,
                        pk:0
                    });
                    res.send(sendData);
                }else{
                    if(userInfo){
                        sendData = responseData.createResponseData({
                            message:'该用户已经存在',
                            data:'NO DATA',
                            code:0,
                            pk:0
                        });
                        res.send(sendData);
                    }else{
                        let grade = paramJson.registerGrade;

                        let email = paramJson.registerEmail;

                        let phoneNum = paramJson.registerPhoneNum;

                        let passWord = paramJson.registerPassWord;
                        var timestamp = (new Date()).getTime();
                        var datestr = dtime().format('YYYY-MM-DD HH:mm:ss');
                        let encryptPassword = t.encryption(passWord);
                        const newAdmin = {
                            id:timestamp,
                            admin_grade:grade,//管理员等级，0超级管理员，1普通管理员
                            admin_name:name,//管理员姓名
                            admin_email:email,//管理员邮箱
                            admin_phone_num:phoneNum,//管理员电话号
                            admin_identity_num:identityNum,//管理员身份证号
                            admin_pass_word:encryptPassword,//管理员密码
                            admin_register_time: datestr//管理员注册时间
                        };
                        AdminModel.create(newAdmin);
                        req.session.admin_id = admin.id;
                        sendData = responseData.createResponseData({
                            message:'注册成功',
                            data:{
                                adminId:timestamp,
                                adminName:name,
                                registerTime:datestr
                            },
                            code:1,//注册成功
                            pk:timestamp
                        });
                        res.send(sendData);
                }

                }
            });
        }
    }
    encryption(password){
        const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }
    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }

}
export default  new Admin();