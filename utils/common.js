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
    toHump(data) {
        let originalData = JSON.parse(JSON.stringify(data));
        let resultData = [];
        for(let num = 0;num<originalData.length;num++){
            let jsonData = JSON.parse(JSON.stringify(originalData[num]));
            let resultJson = {};
            for(let key in jsonData){
                let newKeyName = key.replace(/\_(\w)/g, function(all, letter){
                    return letter.toUpperCase();
                });
                resultJson[newKeyName] = jsonData[key];
            }
            resultData.push(resultJson);
        }
        return resultData;
    }
    jsonToArr(data){
        let originalData = JSON.parse(JSON.stringify(data));
        let  resultData = [];
        for(let key in originalData){
            resultData.push(originalData[key]);
        }
        return resultData;
    }
    // 驼峰转换下划线
    toLine(data) {
        let originalData = JSON.parse(JSON.stringify(data));
        let resultData = {};
        for(let key in originalData){
            let newKeyName = key.replace(/([A-Z])/g,"_$1").toLowerCase();
            resultData[newKeyName] = originalData[key];
        }
        return resultData;
    }
    duringTime(data){
        let originalData = JSON.parse(JSON.stringify(data));
        if(originalData.create_during_time&&originalData.create_during_time.length){
             originalData['create_time']= { "create_time" : { "$gte" :(originalData.create_during_time[0]).toFormat("YYYY-MM-DD HH24:MI:SS") , "$lt" : (originalData.create_during_time[1]).toFormat("YYYY-MM-DD HH24:MI:SS") } };
            delete originalData['create_during_time'];
        }
        if(originalData.update_during_time&&originalData.update_during_time.length){
            originalData['update_time']= { "create_time" : { "$gte" :(originalData.update_during_time[0]).toFormat("YYYY-MM-DD HH24:MI:SS") , "$lt" : (originalData.update_during_time[1]).toFormat("YYYY-MM-DD HH24:MI:SS") } };
            delete originalData['update_during_time'];
        }
        return originalData;
    }
}
export default new common();