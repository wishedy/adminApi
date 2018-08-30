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
}
export default new common();