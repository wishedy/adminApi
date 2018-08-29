const express  = require('express') ;
const config  = require('config-lite') ;
const mongoose = require('mongoose');
const chalk  = require('chalk') ;
import router from './routes/index.js';
const app = express();
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", 'express:4.15.2');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.get('/',function(req,res,next){
   res.send('api根目录');
});
mongoose.connect('mongodb://localhost:27017/loveManagement',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        router(app);
        app.listen(config.port, () => {
            console.log(
                chalk.green(`成功监听端口：${config.port}`)
            )
        });
    }
});
