/*
 商品分类路由
 */
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/imegs/logo.png'
import {Menu, Icon} from 'antd';
import menuConfig from '../../config/menuConfig'
import memoryUtils from "../../utils/memoryUtils";
const SubMenu = Menu.SubMenu;
class LeftNav  extends Component {

    fiadItem = (item) => {
        const menus = memoryUtils.user.role.menus
        const username = memoryUtils.user.username
        // const a=!!menus.find((menusItem) =>item.key===menusItem )

       if(username==='admin' || item.isPublic || menus.indexOf(item.key)!==-1){
           return true
       }else if(item.children){ // 4. 如果当前用户有此item的某个子item的权限
           return !!item.children.find(child =>  menus.indexOf(child.key)!==-1)
       }
           return false

    }
    getMenuNodes=(menuConfig)=>{

        const path=this.props.location.pathname
        return menuConfig.reduce((pre,item)=>{
           if(this.fiadItem(item)){
               if(!item.children){
                   pre.push(
                       (<Menu.Item key={item.key}>
                           <Link to={item.key}>
                               <Icon type={item.icon}/>
                               <span>{item.title}</span>
                           </Link>
                       </Menu.Item>)
                   )
               }else{
                   const citem= item.children.find( itemd=>path.indexOf(itemd.key)===0 )
                   if(citem){
                       this.openKey=item.key
                   }
                   pre.push((
                       <SubMenu key={item.key} title={<span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                            </span> }>
                           {this.getMenuNodes(item.children)}
                       </SubMenu>
                   ))
               }
           }
            return pre
        },[])

    }
    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuConfig)
    }
    render() {
        let path=this.props.location.pathname
        if(path.indexOf('/product')===0){
          path='/product'
        }
       return (
            <div>
                <Link to={'/home'} className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>我的后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)