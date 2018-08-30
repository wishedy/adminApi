class responseData{
 constructor(){

 }
 createResponseData(options){
     let resultData =
     {
         "responseObject":
         {
             "responseMessage":options.message,
             "responseData":options.data,
             "responseCode":options.code,
             "responseStatus":true,
             "responsePk":options.pk
         }
     };
     return resultData;
 }
}
export default  new responseData();