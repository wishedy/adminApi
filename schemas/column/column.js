'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const columnSchema = new Schema({
    column_id:String,//	该栏目的唯一标识
    column_title:String,//该栏目的标题
    parent_column_id:String,//	该栏目的父级栏目id
    column_router_name:String,//该栏目对应的路由名字
    column_index:String,//	该栏目的层级
    is_valid:String,//	该栏目的状态	0无效，1有效
    column_icon:String,//该栏目的icon类名
    admin_id:String,//	创建该栏目的管理员
    update_admin_id:String,//	更新该栏目的管理员
    create_time:String,//	该栏目创建的时间
    update_time:String//	该栏目更新的时间
});
columnSchema.plugin(mongoosePaginate);
const Column = mongoose.model('Column',columnSchema);
export default  Column;