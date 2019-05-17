import React,{Component} from 'react'
import {withRouter}from 'react-router-dom'
import './index.less'
import userdata from '../../utils/memoryUtils'
import MyButton from '../../components/button/button'
import {formateDate} from '../../utils/dateUtils'
import menuConfig from '../../config/menuConfig'
import {reqWeather} from '../../api'
import storageUtils from '../../utils/storageUtils'
import { Modal,Button } from 'antd';

const confirm = Modal.confirm;

class Header extends Component{
    state = {
        currentTime: formateDate(Date.now()), // 当前时间字符串
        dayPictureUrl: '', // 天气图片url
        weather: '', // 天气的文本
    }
    getWeather=async ()=>{
        const {dayPictureUrl, weather} = await reqWeather('北京')
        this.setState({dayPictureUrl, weather})
    }
    setTime=()=>{
      this.interval= setInterval(()=>{
            this.setState({currentTime:formateDate(Date.now())})},
          1000)}
    fun=()=>{
        confirm({
            title: '你是认真的么？',
            okText:'我是认真的',
            cancelText:'我一点都不想点这个',
            onOk:()=>  {
                userdata.user = {}
                storageUtils.removeUser('user_key')
                this.props.history.replace('/login')
            }
            })

        }
    findTitle=()=>{
        const home =this.props.location.pathname
        let title
        menuConfig.forEach((item)=>{
            if(!item.children&&item.key===home){
                title = item.title
            }else if(item.children){
         const citem =  item.children.find(citem=>citem.key===home)
                if(citem){
             title=citem.title
                }
            }

        })
        return title

    }
    componentDidMount () {
        this.setTime()
        this.getWeather()
    }
    componentWillUpdate(){
        clearInterval(this.interval)
}

    render(){
        const {currentTime, dayPictureUrl, weather} = this.state
        const title = this.findTitle()
    const user =userdata.user
        return <header className="header">
            <div className="header-top" >
                <span>欢迎, {user.username}</span>
                <MyButton onClick={this.fun}>退出</MyButton>
            </div>
            <div className="header-bottom" >
                <div className="header-bottom-left" >
                    <span>{title}</span>
                </div>
                <div className="header-bottom-right" >
                    <span className="time-now">
                        {currentTime}
                    </span>
                    <img src={dayPictureUrl} alt="weather" />
                    <span className=" weather">
                        {weather}
                    </span>
                </div>
            </div>
        </header>
    }
}

export default withRouter(Header)