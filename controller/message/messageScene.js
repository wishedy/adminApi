import responseData from '../../utils/responseData';
import MessageSceneModel from '../../schemas/message/messageScene';
const uuid = require('node-uuid');

class MessageScene{
  constructor(){
    this.getList = this.getList.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }
  async getList(req,res,next){
    const query =  req.query;
    const { pageSize, pageIndex } = query;
    delete query.pageSize;
    delete query.pageIndex;
    let sendData = {};
    MessageSceneModel.paginate(query, {
      page: parseInt(pageIndex) || 1,
      limit: parseInt(pageSize) || 10
    }, function(error,data) {
      if(error){
        sendData = responseData.createResponseData({
          message: '获取列表失败',
          data: '',
          code: 1,
          responsePk: 0
        });
      }else{
        sendData = responseData.createResponseData({
          message: '获取列表成功',
          data: data.docs,
          code: 0,
          count:  data.total,
          responsePk: (new Date()).getTime()
        });
      }
      res.send(sendData);
      next();
    });
  }
  async getSingle(req,res,next){
    const query =  req.query;
    let sendData = {};
    MessageSceneModel.findOne(query, function(error,data) {
      if(error){
        sendData = responseData.createResponseData({
          message: '获取列用户失败',
          data: '',
          code: 1,
          responsePk: 0
        });
      }else{
        sendData = responseData.createResponseData({
          message: '获取用户成功',
          data: data,
          code: 0,
          responsePk: (new Date()).getTime()
        });
      }
      res.send(sendData);
      next();
    });
  }
  async create(req, res, next){
    let { data } = req.body;
    let sendData = {};
    data = Object.assign({}, data, {message_scene_id: uuid.v4(), is_valid: true, create_time: new Date(), update_time: new Date()});
    MessageSceneModel.create(data, (error, data) => {
      if (error) {
        sendData = {
          message:'添加失败',
          data: '',
          code: 1,
          responsePk: 0
        };
      } else {
        sendData = {
          message:'添加成功',
          data: data,
          code: 0,
          responsePk: (new Date()).getTime()
        };
      }
      res.send(sendData);
      next();
    });
  }
  async update(req,res,next){
    const {message_scene_id, data} =  req.body;
    data.update_time = new Date();
    let sendData = {};
    MessageSceneModel.update({message_scene_id}, {$set: data}, function(error, data){
      if(error){
        sendData = responseData.createResponseData({
          message:'更新信息失败',
          data: '',
          code: 1,
          pk: 0
        });
      }else{
        sendData = responseData.createResponseData({
          message:'更新信息成功',
          data: data,
          code: 0,
          pk:(new Date()).getTime()
        });
      }
      res.send(sendData);
      next();
    });
  }
}
export default new MessageScene();
