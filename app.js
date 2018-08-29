const express  = require('express') ;
const config  = require('config-lite') ;
const chalk  = require('chalk') ;
const app = express();
app.get('/',function(req,res,next){
   res.send('api根目录');
});
app.listen(config.port, () => {
    console.log(
        chalk.green(`成功监听端口：${config.port}`)
    )
});