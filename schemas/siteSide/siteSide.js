'use strict';
const mongoose  = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const sideSchema = new Schema({
    side_id:String,//该侧边栏的唯一标识
    side_title:String,//侧边栏标题
    side_class_name:String,//侧边栏的iconClass
    create_time:String,//创建侧边栏的时间
    z_index:String,//层级
    parent_site_id:String,//父层侧边栏id
    router_module:String,//路由模块名字
    admin_name:String,
    admin_id:String,
    is_valid:String,//0无效，1有效
    update_time:String//评论操作侧边栏的最新时间
});
sideSchema.plugin(mongoosePaginate);
const Side = mongoose.model('Side',sideSchema);
export default  Side;