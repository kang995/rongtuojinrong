import qs from 'qs';
import Vue from 'vue';
var vue = new Vue();
var  AppConfig = {
     token:'1143416887620616193'  //  1143416887620616193  1141572772779999233
    ,apiUrl:"http://api.php.sit.rongtuojinrong.com"
    ,appName:''
    ,loginPage:'register.html',
}
// console.log(Vue.$http)
const  AppAjax ={
    baseUrl:AppConfig.apiUrl
    //【POST请求】
    ,post:function(pUrl,pData,pSuccessFun){
        pUrl = AppAjax.baseUrl + pUrl;
        // pData.token = AppConfig.token;
//        $.ajax({
//            headers: {
//               token: AppConfig.token
//            },
//            url:pUrl,
//            type:'POST',
//            data:JSON.stringify(pData),//pData,//JSON.stringify(),
//            contentType:"application/json",
//            beforeSend:function (request) {
//            },
//            success:function(respondData){
//                if(AppAjax.responseFormat(pUrl,respondData)){
//                    pSuccessFun(respondData);
//                }
//            },
//            error:function(respondData){
//                AppAjax.responseFormat(pUrl,respondData)
//            }
//        });
        pData = qs.stringify(pData);
        vue.$http.post(pUrl,pData).then(res=>{
            pSuccessFun(res)
        })

    }
    //【GET请求】
    ,get:function(pUrl,pData,pSuccessFun){
        pUrl = AppAjax.baseUrl + pUrl;
        Vue.$http.get(pUrl,pData).then(res=>{
            pSuccessFun(res);
        })
    }
    //【请求统一处理】
    ,responseFormat:function(url,respondData){
        console.log("接口返回数据")
        console.log(respondData)
        if(respondData.status == 404){
            alert("接口404")
        }else if( respondData.success === false){
            if(respondData.code == 401){
                window.location.href = AppConfig.loginPage;
                alert("重新登录")
            }else{
                //alert(respondData.message)
                // 调用提示弹窗  $("body").html("<div align='center'><h1>"+respondData.message+"</h1></div>")
//                  $("#end").fadeIn();
                document.getElementById("xinxi").innerHTML= respondData.message;
               //mui.toast(respondData.message,{duration:'long(7500ms)', type:'div'})
                /*mui.alert(respondData.message, '提示','确认',function(){
                    info.innerText = "你刚关闭了警告框";
                });*/
            }

        }else{
        }
        return true;
    }
}

export default
{
    AppAjax
}
