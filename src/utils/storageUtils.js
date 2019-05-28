/**
 * Created by user on 2019/5/15.
 */
import store from 'store'
export default {
    saveUser(user){
        // localStroage只能保存string, 如果传递是对象, 会自动调用对象的toString()并保存
        //localStorage.setItem(USER_KEY, JSON.stringify(user)) // 保存的必须是对象的json串
        store.set('user_key', user) // 内部会自动转换成json再保存
    },
    getUser(){
     return   store.get('user_key')||{}
    },
    removeUser(user){
        store.remove('user_key')
    }
}