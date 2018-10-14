import responseData from "../../utils/responseData";
const fs=require('fs') ;
const ejs=require('ejs') ;
const path = require('path');
class CreateArticle{
    constructor(){
        let t = this;
        t.create = t.create.bind(this);
    }
    create(req,res,next){
        let t = this;
        let myPath = path.normalize(path.resolve(__dirname, '../../')+'/static/html/new.ejs');
        let targetPath = path.normalize(path.resolve(__dirname, '../../')+'/views/html/');
        console.log(myPath);
        fs.readFile(myPath, function (e, v) {
            console.log(e,v);
                let ret = v.toString();//
                let options = {
                    names: ['foo', 'bar', 'baz']
                };
                let template = ejs.render(ret,options);
                fs.writeFile(targetPath+'2.html', template, function (err) {
                    if (err) throw err;
                    let sendData = responseData.createResponseData({
                        message:'静态生成完毕',
                        data:'OK',
                        code:0,
                        responsePk:0
                    });
                    res.send(sendData);
                });
            }

        );
    }
}
export default  new CreateArticle();