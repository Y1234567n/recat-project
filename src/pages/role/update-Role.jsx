import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Input,
    Tree
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item

const { TreeNode } = Tree;

export default class UpdateRole extends Component {
    static propTypes={
        role:PropTypes.object.isRequired
    }
    constructor (props) {
        super(props)

        // 根据传入角色的menus生成初始状态
        const {menus} = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }
    getMenus = () => this.state.checkedKeys
    onCheck = checkedKeys => {
        this.setState({ checkedKeys });
    };
    componentWillReceiveProps (nextProps) {
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }

    getTreeNodes=(menuList)=>{
        return menuList.reduce((rep,item)=>{
         rep.push(<TreeNode title={item.title} key={item.key}>
             {item.children?this.getTreeNodes(item.children):null}
            </TreeNode>)
            return rep
        },[])
    }
    componentWillMount(){
      this.treeNodes=this.getTreeNodes(menuList)
    }
    render() {
        const role=this.props.role
        const {checkedKeys}=this.state
        const formItemLayout = {
            labelCol: { span: 4 },  // 左侧label的宽度
            wrapperCol: { span: 15 }, // 右侧包裹的宽度
        }
        return (
            <div>
                <Item label='管理层级'{...formItemLayout}>
                    <Input value={role.name} disabled/>
                </Item>
            <Tree
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
            >
                <TreeNode title="权限管理" key="0-0">
                    {this.treeNodes}
                </TreeNode>
            </Tree>
            </div>
        )
    }
}