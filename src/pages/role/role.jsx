import React, {Component} from 'react'
import {Card,Button,Table,Modal}from 'antd'
import {reqRoles,reqUpdateRoles,reqAddRole}from'../../api'
import AddRoles from './add-roles'
import UpdateRole from './update-Role'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from "../../utils/memoryUtils"
/*
 角色路由
 */
export default class Role extends Component {
    constructor (props) {
        super(props)

        this.anth = React.createRef()
    }

    state={
        roles:[],
        role:{},
        showStatu:true,
        showStatus:true
    }
    initColumns=()=>{
        this.columns=[
           {
               title: '角色名称',
               dataIndex: 'name',
           },{
               title: '创建时间',
               dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
        },{
               title: '授权时间',
               dataIndex: 'auth_time',
                render: (auth_time) => formateDate(auth_time)
           },{
               title: '授权人',
               dataIndex: 'auth_name',
           }
       ]
    }
    addRoles=()=>{
        this.setState({showStatus:true})
        this.form.validateFields(async (error, values)=>{
            const {roleName} = values
            const resolu = await reqAddRole(roleName)

            if(resolu.status===0){
                this.getRolles()
            }
        })



    }

     getRolles = async()=>{

        const relust=await reqRoles()
        const roles=relust.data

         if(relust.status===0){
             this.setState({roles})
         }

    }
    onRow=(role)=>{
            return {
                onClick: event => {
                    this.setState({
                        role
                    })
                }
            };
    }
    updateRole= async()=>{
        let role = this.state.role
        let menus = this.anth.current.getMenus()
        role.menus = menus
        role.auth_time = Date.now()
        role.auth_name = memoryUtils.user.username
        const result = await reqUpdateRoles(role)
        if (result.status===0){
            this.setState({
                showStatu:true
            })

        }
    }

    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getRolles()
    }

    render() {
        const {roles,role,showStatus,showStatu} =this.state
        const title=( <span>
                <Button type='primary' onClick={()=>this.setState({showStatus:false})}>增加管理层</Button>&nbsp;&nbsp;
                <Button
                    onClick={()=>this.setState({showStatu:false})}
                    type='primary'
                    disabled={!role._id}>设置管理层权限</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    rowKey='_id'
                    bordered
                    dataSource={roles}
                    pagination={{pageSize:5}}
                     onRow={this.onRow}
                     rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                    columns={this.columns}>
                </Table>
                <Modal
                    title="添加管理层"
                    visible={!showStatus}
                    onOk={this.addRoles}
                    onCancel={() => this.setState({showStatus: true})}
                >
                    <AddRoles setFrom={(form)=>this.form=form}/>
                </Modal>
                <Modal
                    title="设置管理层权限"
                    visible={!showStatu}
                    onOk={this.updateRole}
                    onCancel={() => this.setState({showStatu:true})}
                >
                    <UpdateRole  ref={this.anth} role={role} />

                </Modal>


            </Card>
        )
    }
}