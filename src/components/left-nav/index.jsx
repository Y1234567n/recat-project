/*
 商品分类路由
 */
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/imegs/logo.png'
import {Menu, Icon, Button} from 'antd';
import menuConfig from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;
export default class LeftNav  extends Component {
// {
//     title: '首页', // 菜单标题名称
//     key: '/home', // 对应的path
//     icon: 'home', // 图标名称
// }
// {
//     title: '商品',
//     key: '/products',
//     icon: 'appstore',
//     children: [ // 子菜单列表
//         {
//             title: '品类管理',
//             key: '/category',
//             icon: 'bars'
//         },
//         {
//             title: '商品管理',
//             key: '/product',
//             icon: 'tool'
//         },
//         ]
    getMenuNodes=(menuConfig)=>{
        return menuConfig.reduce((rop,item)=>{
            if(!item.children){
                return rop.push(
                    (<Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>)
                )
            }else{
                return  rop.push((
                    <SubMenu key={item.key} title={<span>
                            <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span> }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
        },[])

    }
    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuConfig)
    }
    render() {
        return (
            <div>
                <Link to={'/home'} className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>我的后台</h1>
                </Link>
                {
                    this.getMenuNodes
                }


            </div>
        )
    }
}