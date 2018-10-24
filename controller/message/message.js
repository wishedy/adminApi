'use strict';
import responseData from '../../utils/responseData';
import MessageModel from '../../schemas/message/message.js';
import SceneMessageModel from '../../schemas/sceneMessage/sceneMessage';
class Message {
    constructor(){
        this.getList = this.getList.bind(this);
        this.activate = this.activate.bind(this);
        this.inactive = this.inactive.bind(this);
        this.getSceneList = this.getSceneList.bind(this);
        this.createSceneMessage = this.createSceneMessage.bind(this);
        this.updateSceneMessage = this.updateSceneMessage.bind(this);
        this.activateScene = this.activateScene.bind(this);
        this.inactiveScene = this.inactiveScene.bind(this);
    }

    async getList(req,res,next){
        const { page, limit } = req.query;
        let sendData = {};
        // 数据库查询
        MessageModel.find({}, {page: page || 10, limit: limit || 10 },function(error,messageList){
          if(error){
            sendData = responseData.createResponseData({
              message:'error',
              data:'NO DATA',
              code:0,
              pk:0
            });
            res.send(sendData);
          }else{
            sendData = responseData.createResponseData({
              message:'success',
              data: messageList,
              code:1,
              pk:(new Date()).getTime()
            });
            res.send(sendData);
          }
        });
    }

    async activate(req,res){
      const { id } = req.query;
      // 数据库更新
    }

    async inactive(req,res,next){
      const { id } = req.query;
      // 数据库更新
    }

    async getSceneList(req,res,next){
    const { page, limit } = req.query;
    let sendData = {};
    // 数据库查询
      SceneMessageModel.find({}, {page: page || 10, limit: limit || 10 },function(error,messageList){
      if(error){
        sendData = responseData.createResponseData({
          message:'error',
          data:'NO DATA',
          code:0,
          pk:0
        });
        res.send(sendData);
      }else{
        sendData = responseData.createResponseData({
          message:'success',
          data: messageList,
          code:1,
          pk:(new Date()).getTime()
        });
        res.send(sendData);
      }
    });
    }

    async createSceneMessage(req,res){
      const { id } = req.query;
      // 数据库增加记录
    }

    async updateSceneMessage(req,res){
      const { id } = req.query;
      // 数据库更新记录
    }

    async activateScene(req,res){
    const { id } = req.query;
    // 数据库更新
    }

    async inactiveScene(req,res,next){
    const { id } = req.query;
    // 数据库更新
    }
}
export default  new Message();
