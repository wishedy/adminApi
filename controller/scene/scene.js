'use strict';
const uuid = require('node-uuid');
import responseData from '../../utils/responseData';
import SceneModel from '../../schemas/scene/scene.js';
class Scene {
    constructor(){
        this.getSceneList = this.getSceneList.bind(this);
        this.createScene = this.createScene.bind(this);
        this.updateScene = this.updateScene.bind(this);
    }
    /* 管理员接口 */
    async getSceneList(req,res,next){
    const { page, limit } = req.query;
    let sendData = {};
    // 数据库查询
      SceneModel.find({}, {page: page || 10, limit: limit || 10 },function(error,messageList){
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
    async createScene(req, res, next){
      let { data } = req.body;
      data = Object.assign({}, data, {id: uuid.v4().replace(/-/g, ""), is_valid: true, create_time: new Date(), update_time: new Date()});
      SceneModel.create(data, (error, scene) => {
        if (error) {
          res.send({
            message:'create scene fail',
            data: null,
            code: 1,
            pk: new Date()
          });
        } else {
          res.send({
            message:'create scene fail',
            data: scene,
            code: 1,
            pk: new Date()
          })
        }
      });
      // 数据库增加记录
    }
    async updateScene(req,res){
      const { id, data } = req.body;
      data.update_time = new Date();
      // 数据库更新
      let sendData = {};
      // 数据库查询
      SceneModel.update({id}, {$set: data}, function(error, scene){
        if(error){
          sendData = responseData.createResponseData({
            message:'update scene error',
            data: null,
            code:0,
            pk:0
          });
          res.send(sendData);
        }else{
          sendData = responseData.createResponseData({
            message:'update scene success',
            data: scene,
            code:1,
            pk:(new Date()).getTime()
          });
          res.send(sendData);
        }
      });
    }
}
export default  new Scene();
