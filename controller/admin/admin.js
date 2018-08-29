'use strict';
import AdminModel from '../../schemas/admin/admin.js';
class Admin {
    constructor(){

    }
    async register(req,res,next){
        res.send('注册成功');
    }

}
export default  new Admin();