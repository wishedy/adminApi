'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const iconSchema = new Schema({
    icon_id:String,//	该icon的唯一标识
    icon_name:String,//	该icon的类名
    create_time:String//	该icon创建的时间
});
iconSchema.plugin(mongoosePaginate);
const Icon = mongoose.model('Icon',iconSchema);
export default  Icon;