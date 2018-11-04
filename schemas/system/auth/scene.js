'use strict';
const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const sceneSchema = new Schema({
    scene_id:String,
    scene_title:String,
    customer_state:String,
    experience_times: Number,
    visitor_enable: Boolean,
    black_enable: Boolean,
    registered_enable: Boolean,
    checked_enable: Boolean,
    is_valid:Boolean,
    create_time: String,
    update_time: String,
});
const Scene = mongoose.model('Scene',sceneSchema);
export default  Scene;
