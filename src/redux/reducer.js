/**
 * Created by user on 2019/5/24.
 */
import {combineReducers} from 'redux'
import actionType from './action-types'
import storageUtils from "../utils/storageUtils"
import {SET_HEAD_TITLE} from './action-types'
const initHeadTitle = '首页'

function headTitle(state = initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
    switch (action.type) {
        default:
            return state
    }
}

/*
 向外默认暴露的是合并产生的总的reducer函数
 管理的总的state的结构:
 {
 headTitle: '首页',
 user: {}
 }
 */
export default combineReducers({
    headTitle,
    user
})