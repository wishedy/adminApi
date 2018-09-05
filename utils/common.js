class common {
    constructor(){

    }
    //空对象判断方法
    isEmptyObject(obj){
        for(let n in obj){return false}
        return true;
    }
    isNothing(val){
        if(((typeof val =='string')&&(val.length==0))||(val==undefined)||(val=='undefined')||(val=='null')||(typeof val=='undefined')||(typeof val=='null')||(val==null)){
            return true;
        }else{
            return false;
        }
    }
    // 下划线转换驼峰
    toHump(name) {
        return name.replace(/\_(\w)/g, function(all, letter){
            return letter.toUpperCase();
        });
    }
    // 驼峰转换下划线
    toLine(name) {
        return name.replace(/([A-Z])/g,"_$1").toLowerCase();
    }
}
export default new common();