'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const messageSceneSchema = new Schema({
    message_scene_id:String,//消息类型的唯一标识
    message_scene_title: String,
    message_scene_icon: String,
    message_scene_template: String,
    message_scene_link: String,
    is_valid: Boolean,
    create_time:String,
    update_time:String
});
messageSceneSchema.plugin(mongoosePaginate);
const messageScene = mongoose.model('messageScene',messageSceneSchema);
export default  messageScene;
