class common {
    constructor(){
        this.deleteEmptyProperty = this.deleteEmptyProperty.bind(this);
        this.isEmptyObject = this.isEmptyObject.bind(this);
        this.isEmpty = this.isEmpty.bind(this);
        this.isNothing = this.isNothing.bind(this);
        this.toHump = this.toHump.bind(this);
        this.isNothing = this.isNothing.bind(this);
        this.toHump = this.toHump.bind(this);
        this.toLine = this.toLine.bind(this);
    }
    //空对象判断方法
    isEmptyObject(obj){
        for(let n in obj){return false}
        return true;
    }
    deleteEmptyProperty(object){
        let t = this;
        for (var i in object) {
            var value = object[i];
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    if (value.length == 0) {
                        delete object[i];
                        continue;
                    }
                }
                t.deleteEmptyProperty(value);
                if (t.isEmpty(value)) {
                    delete object[i];
                }
            } else {
                if (value === '' || value === null || value === undefined) {
                    delete object[i];
                } else {
                }
            }
        }
    }
    isEmpty(object) {
        for (var name in object) {
            return false;
        }
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