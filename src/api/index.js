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
//登录
export function reqLogin(username,password) {
    return ajax( '/login',{username,password},'post')
}
//获取分类
export const  reqClassify=(parentId)=> ajax( '/manage/category/list',{parentId})

//添加分类
export const reqaddClassify=(categoryName,parentId)=> ajax('/manage/category/add',{categoryName,parentId},'post')

//更新修改分类
export const reqUpdateClassify=(categoryId,categoryName)=> ajax('/manage/category/update',{categoryId,categoryName},'post')

//根据ID获取分类
export const reqClassifys=(categoryId)=>ajax('/manage/category/info',{categoryId})

//获取商品分页数据
export const reqCommodity=(pageNum, pageSize)=> {
    return ajax('/manage/product/list',{pageNum,pageSize})
}
//获取管理层
export const reqRoles=()=>{return ajax('/manage/role/list')}
//添加管理层
export const reqAddRole=(roleName)=> ajax('/manage/role/add',{roleName},'post')
//修改权限
export const reqUpdateRoles=(role)=>{return ajax('/manage/role/update',role,'post')}
//获取用户
export const reqGetUser=()=>ajax('/manage/user/list')
//添加或者修改用户
export const reqAddUser = (user)=> ajax(`manage/user/${user._id?'update':'add'}`,user,'post')
//删除用户
export const reqDeletUser=(userId)=>ajax('/manage/user/delete',{userId},'post')
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax('/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
})
export const reqUpdates=(productId,status)=>ajax('/manage/product/updateStatus',{productId,status},'post')
//获取天气JSONP请求
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
// export const reqCity = ()=> {
//     // return new Promise((resolve,reject)=>{
//         const url = `http://pv.sohu.com/cityjson`
//     // const url = `http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
//     console.log(123)
//     jsonp(url,{},(err,data)=>{
//         console.log(data)
//     })
//         jsonp(url,{},(err,data)=>{
//             console.log(123)
//             console.log(data)
//             if (!err && data.status==='success') {
//                 // 取出需要的数据
//                 console.log(data)
//                 // const {cname} = data
//                 // resolve({cname})
//             } else {
//                 // 如果失败了
//                 message.error('获取天气信息失败!')
//             }
//         })
//     // })
// }
// export function reqCity() {
//     return ajax('http://pv.sohu.com/cityjson')
// }
// async function aa() {
//     const result  =await reqCity()
//     console.log(result)
//
// }
// aa()
