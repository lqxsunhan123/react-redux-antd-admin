import axios from 'axios'
import qs from 'qs'
import {config, history} from '../constants/config'
const instance = axios.create({
    baseURL: config.baseUrl,
    // timeout: 100000,
    method: 'post',
    // transformResponse: [function (data) {
    //     // 对 data 进行任意转换处理
    //     console.log(data);
    //     return data;
    // }],
    transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        // 这里使用qs的原因是因为axios默认是application/x-www-form-urlencoded,需要把请求参数转换成类似a=s&b=m的
        let newData = qs.stringify(data, { indices: false });
        // 数组默认会被转换成  'a[0]=b&a[1]=c&a[2]=d'   ，这样我们后台是接收不了的,我们需要加indices:false的选项,他会这样转换 a=b&a=c&a=d
        console.log(newData)
        return newData;
        // return data;
    }],
    // 这表示请求的时候会携带cookie
    withCredentials: true
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    let token  = localStorage.getItem("token");
    if(token != null){
        config.headers.token = token
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 自定义的ajax请求方法，传入history对象方便路由
export const fetchPost = (url = '', data = {}, handle, option = {}) => {
    // 根据一些异常的响应代码做出动作
    console.log(url);
    console.log(data);
    return instance.post(url, data, option).then(r => {
        let {code, status, msg} = r.data;
        if(code == 10000){
            console.log("跳转首页")
            // token失效，重新登录
            localStorage.removeItem("token");
            history.replace("/");
        }
        if(status != 1){
            // 有业务异常
            alert(msg)
        } else {
        // 这里因为axios返回值会自动包装成data，我们将其取出后返回
        handle(r.data)
        }
    }).catch((e) => {
        alert(e);
    });
}

export const fetchGet = (url = '', handle, option = {}) => {
    return instance.get(url, option).then(r => {
        let {code, status, msg} = r.data;
        if(code == 10000){
            console.log("跳转首页")
            // token失效，重新登录
            localStorage.removeItem("token");
            history.replace("/");
        }
        if(status != 1){
            // 有业务异常
            alert(msg)
        } else {
        // 这里因为axios返回值会自动包装成data，我们将其取出后返回
        handle(r.data)
        }
    }).catch((e) => {
        alert(e);
    });
}


