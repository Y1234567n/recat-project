/**
 * Created by user on 2019/5/15.
 */
import jsonp from 'jsonp'
import {message} from 'antd'
import ajax from './ajax'
/*
 要求: 能根据接口文档定义接口请求
 包含应用中所有接口请求函数的模块
 每个函数的返回值都是promise
 */
export function reqLogin(username,password) {
    return ajax('/login',{username,password},'post')
}
export const reqWeather = (city)=> {
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(err,data)=>{
            if (!err && data.status==='success') {
                // 取出需要的数据
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                // 如果失败了
                message.error('获取天气信息失败!')
            }
        })
    })
}