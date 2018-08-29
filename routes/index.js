'use strict';
import admin from './admin.js';
export default app=>{
    app.use('/call/admin',admin);
}