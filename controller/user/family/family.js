import responseData from '../../../utils/responseData';
import FamilytModel from '../../../schemas/user/family/family';

class Family{
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
      FamilytModel.paginate(query, {
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
      FamilytModel.findOne(query, function(error,data) {
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
    async update(req,res,next){
      const {family_id, data} =  req.body;
      data.update_time = new Date();
      let sendData = {};
      FamilytModel.update({family_id}, {$set: data}, function(error, data){
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
export default new Family();
