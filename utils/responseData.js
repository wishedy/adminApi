class responseData{
 constructor(){
   this.createResponseData = this.createResponseData.bind(this);
 }
 createResponseData(options){
     let result = {};
     result['data_list'] = options.data;
     let resultData ={};
     if(!options.count&&options.count!==0){
         resultData = {
             "responseObject":{
                 "responseMessage":options.message,
                 "responseData":result,
                 "responseCode":options.code,
                 "responseStatus":true,
                 "responsePk":options.pk
             }
        }
     }else{
         result["totalCount"] = options.count;
         resultData = {
             "responseObject":{
                 "responseMessage":options.message,
                 "responseData":result,
                 "responseCode":options.code,
                 "responseStatus":true,
                 "responsePk":options.pk
             }
         }
     }

     return resultData;
 }
}
export default  new responseData();