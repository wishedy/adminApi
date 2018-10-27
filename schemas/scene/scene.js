'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const sceneSchema = new Schema({
    id:String,
    title:String,
    is_valid:Boolean,
    icon: Buffer,
    href: String,
    create_time:String,
    update_time:String
});
sceneSchema.plugin(mongoosePaginate);
const scene = mongoose.model('Scene',sceneSchema);
export default  scene;
