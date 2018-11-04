import responseData from '../../utils/responseData';
import TemplateModel from '../../schemas/template/template';

class Template{
  constructor(){
    this.getList = this.getList.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.update = this.update.bind(this);
  }
  async getList(req,res,next){
    const query =  req.query;
    const { pageSize, pageIndex } = query;
    delete query.pageSize;
    delete query.pageIndex;
    let sendData = {};
    TemplateModel.paginate(query, {
      page: parseInt(pageIndex) || 1,
      limit: parseInt(pageSize) || 10
    }, function(error,data) {
      if(error){
        sendData = responseData.createResponseData({
          message: '获取列用户表失败',
          data: '',
          code: 1,
          responsePk: 0
        });
      }else{
        sendData = responseData.createResponseData({
          message: '获取用户列表成功',
          data: data.docs,
          code: 0,
          count:  data.total,
          responsePk: (new Date()).getTime()
        });
      }
      res.send(sendData);
    });
  }
  async getSingle(req,res,next){
    const query =  req.query;
    let sendData = {};
    TemplateModel.findOne(query, function(error,data) {
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
    });
  }
  async update(req,res,next){
    const {template_id, data} =  req.body;
    data.update_time = new Date();
    let sendData = {};
    TemplateModel.update({template_id}, {$set: data}, function(error, data){
      if(error){
        sendData = responseData.createResponseData({
          message:'更新用户信息失败',
          data: '',
          code: 1,
          pk: 0
        });
        res.send(sendData);
      }else{
        sendData = responseData.createResponseData({
          message:'更新用户信息成功',
          data: data,
          code: 0,
          pk:(new Date()).getTime()
        });
        res.send(sendData);
      }
    });
  }
}
export default new Template();
