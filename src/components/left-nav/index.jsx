/*
 商品分类路由
 */
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.less'
import logo from '../../assets/imegs/logo.png'
import {Menu, Icon} from 'antd';
import menuConfig from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;
class LeftNav  extends Component {
    getMenuNodes=(menuConfig)=>{
        const path=this.props.location.pathname
        return menuConfig.reduce((pre,item)=>{
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

              const citem= item.children.find( itemd=>itemd.key===path )
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
            return pre
        },[])

    }
    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuConfig)
    }
    render() {
        const path=this.props.location.pathname
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