'use strict';
import common from '../../utils/common';
import responseData from '../../utils/responseData';
require('date-utils');
const crypto  = require('crypto');
import AdminModel from '../../schemas/system/admin.js';
class Admin {
    constructor(){
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.encryption = this.encryption.bind(this);
    }
    async register(req,res,next){
        let t  = this;
        let paramJson =  JSON.parse(req.body.paramJson);
        var sendData = {};
        if(common.isEmptyObject(paramJson)||common.isNothing(paramJson)){
           //传入的是空对象或者没有传值
             sendData = responseData.createResponseData({
               message:'注册管理员失败',
               data:'',
               code:1,
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
                        data:'',
                        code:1,
                        pk:0
                    });
                    res.send(sendData);
                }else{
                    if(userInfo){
                        sendData = responseData.createResponseData({
                            message:'该用户已经存在',
                            data:'',
                            code:0,
                            pk:userInfo.admin_id
                        });
                        res.send(sendData);
                    }else{
                        let grade = paramJson.registerGrade;

                        let email = paramJson.registerEmail;

                        let phoneNum = paramJson.registerPhoneNum;

                        let passWord = paramJson.registerPassWord;
                        let timestamp = (new Date()).getTime();
                        let dt = new Date();
                        let datestr = dt.toFormat("YYYY-MM-DD HH24:MI:SS");
                        let encryptPassword = t.encryption(passWord);
                        const newAdmin = {
                            admin_id:timestamp,
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
                            code:2,//注册成功
                            pk:timestamp
                        });
                        res.send(sendData);
                }

                }
            });
        }
    }
    async login(req,res,next){
        let t = this;
        var paramJson =  JSON.parse(req.body.paramJson);
        var sendData = {};
        if(common.isEmptyObject(paramJson)||common.isNothing(paramJson)){
            //传入的是空对象或者没有传值
            sendData = responseData.createResponseData({
                message:'参数有误',
                data:'NO DATA',
                code:0,//登录失败
                pk:0
            });
            res.send(sendData);
        }else{
            let name = paramJson.adminName;
            let originalPassWord = paramJson.adminPassWord;
            let passWord = t.encryption(originalPassWord);
            const admin = AdminModel.findOne({'admin_name':name},function(error,userInfo){
                if(userInfo){
                    if(userInfo.admin_pass_word===passWord){
                        //密码一致
                        sendData = responseData.createResponseData({
                            message:'登录成功',
                            data:{
                                adminName:userInfo.admin_name,
                                adminEmail:userInfo.admin_email,
                                adminPhoneNum:userInfo.admin_phone_num,
                                adminGrade:userInfo.admin_grade
                            },
                            code:2,//登录成功
                            pk:userInfo.admin_id
                        });
                        res.send(sendData);
                    }else{
                        //密码不一致
                        sendData = responseData.createResponseData({
                            message:'账号或密码不正确',
                            data:'NO DATA',
                            code:1,//密码不正确
                            pk:0
                        });
                        res.send(sendData);
                    }
                }else{
                    sendData = responseData.createResponseData({
                        message:'账号或密码不正确',
                        data:'NO DATA',
                        code:1,//密码不正确
                        pk:0
                    });
                    res.send(sendData);
                }
            });
        }
    }
    async logout(req,res,next){}
    async updatePassword(req, res, next) {
      const {admin_id, old_password, new_password} = req.body;
      let sendData = {};
      AdminModel.findOne({admin_id},function(error,userInfo){
        if(userInfo){
          if(userInfo.admin_pass_word === old_password){
            AdminModel.update({admin_id}, (error, data) => {
               if (error) {
                 sendData = {
                   message: '更新密码失败',
                   data: '',
                   code: 1,
                   pk: 0
                 };
               } else {
                 sendData = {
                   message: '更新密码成功',
                   data: '',
                   code: 0,
                   pk: new Date().getTime()
                 };
               }
              res.send(sendData);
            });

          }else{
            sendData = responseData.createResponseData({
              message: '密码不正确',
              data:'',
              code: 1,
              pk: 0
            });
            res.send(sendData);
          }
        }else{
          sendData = responseData.createResponseData({
            message:'账号查询失败',
            data:'',
            code:1,
            pk:0
          });
          res.send(sendData);
        }
      });
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
