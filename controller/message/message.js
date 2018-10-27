'use strict';
import responseData from '../../utils/responseData';
import MessageModel from '../../schemas/message/message.js';
class Message {
    constructor(){
        /*前端api*/
        this.getFollowers = this.getFollowers.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.getComments = this.getComments.bind(this);
        this.addComment = this.addComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        /*管理平台api*/
        this.getList = this.getList.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }
    /* 前端接口 */
    async getFollowers(req, res, next) {
      const { messageId } = req.query;
      let sendData = {};
    }
    async follow(req, res, next) {
      const { id, messageId } = req.query;
    }
    async unfollow(req, res, next) {
      const { id, messageId } = req.query;
    }
    async getComments(req, res, next) {
      const { id, messageId } = req.query;
    }
    async addComment(req, res, next) {
      const { id, messageId } = req.query;
    }
    async updateComment(req, res, next) {
      const { id, messageId, comment } = req.query;
    }
    async deleteComment(req, res, next) {
      const { id, messageId, comment } = req.query;
    }
    /* 管理员接口 */
    async getList(req,res,next){
        const { page, limit } = req.query;
        let sendData = {};
        const filter = {};
        Object.keys(req.query).forEach(k => {
          if (['page', 'limit'].indexOf(k) === -1) {
            filter[k] = req.query[k];
          }
        });
        // 数据库查询
        MessageModel.find(filter, {page: page || 10, limit: limit || 10 },function(error,messageList){
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
    async updateMessage(req,res){
      const { id, state } = req.body;
      // 数据库更新
      let sendData = {};
      // 数据库查询
      MessageModel.update({id}, {$set: {is_valid: state, update_time: new Date()}}, function(error, message){
        if(error){
          sendData = responseData.createResponseData({
            message:'update error',
            data:'NO DATA',
            code:0,
            pk:0
          });
          res.send(sendData);
        }else{
          sendData = responseData.createResponseData({
            message:'update success',
            data: message,
            code:1,
            pk:(new Date()).getTime()
          });
          res.send(sendData);
        }
      });
    }
}
export default  new Message();
