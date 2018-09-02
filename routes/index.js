'use strict';
import admin from './admin.js';
import createData from './createData.js';
export default app=>{
    app.use('/call/admin',admin);
    app.use('/call/createvirtualdata',createData);
}