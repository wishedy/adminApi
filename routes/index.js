'use strict';
import admin from './admin.js';
import createData from './createData.js';
import customer from './customer.js';
import dynamic from './dynamic.js';
import topic from './topic.js';
import Recommend from './recommend.js';
export default app=>{
    app.use('/call/admin',admin);
    app.use('/call/createVirtualData',createData);
    app.use('/call/customer',customer);
    app.use('/call/dynamic',dynamic);
    app.use('/call/topic',topic);
    app.use('/call/recommend',Recommend);
}