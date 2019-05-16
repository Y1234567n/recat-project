/**
 * Created by user on 2019/5/15.
 */
import ajax from './ajax'
/*
 要求: 能根据接口文档定义接口请求
 包含应用中所有接口请求函数的模块
 每个函数的返回值都是promise
 */
export function reqLogin(username,password) {
    return ajax('/login',{username,password},'post')
}
export function reqadmin() {
    
}