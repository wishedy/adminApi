'use strict';
import admin from './admin.js';
import createData from './createData.js';
import customer from './customer.js';
export default app=>{
    app.use('/call/admin',admin);
    app.use('/call/createvirtualdata',createData);
    app.use('/call/customer',customer);
}