import React, {Component} from 'react'
import {Card,Button,Table,Modal,message}from 'antd'
import MyButton from '../../components/button/button'
import {reqGetUser,reqAddUser,reqDeletUser}from'../../api'
import {formateDate}from '../../utils/dateUtils'
import Adduser from "./add-user";

/*
用户路由
 */
const confirm = Modal.confirm;

export default class User extends Component {
  state={
      users:[],
      roles:[],
      isVisible:false
  }
  initUser=()=>{
    this.columns=[{
        title:'用户名',
        dataIndex:'username'
    },{
        title:'邮箱',
        dataIndex:'email'
    },{
        title:' 电话',
        dataIndex:'phone'
    },{
        title:'注册时间',
        dataIndex:'create_time',
        render:(create_time)=>formateDate(create_time)

    },{
        title:' 所属角色',
        dataIndex:'role_id',
        render:(role_id)=>this.roleName(role_id)
    },{
        title:'操作',
        render:(user)=>{
            return (<span>
           <MyButton onClick={()=>{
             this.user=user
              this.setState({isVisible:true})
           }}>修改</MyButton>
           <MyButton onClick={()=>this.deletUser(user)}>删除</MyButton>
        </span>)
        }
    },]
  }
  getUsers = async ()=>{
   const resovl=await reqGetUser()
      if(resovl.status===0){
        const {users,roles}=resovl.data
          this.setState({users,roles})
      }
  }
    roleName = (role_id) =>{
      const {roles} =this.state
      const name= roles.find((item)=>item._id===role_id).name
      return name
    }
    addUser=()=>{
        // const user = this.form.getFieldsValue()

        this.form.validateFields(async (err, values) => {
            if (!err) {
                values.userName=''
                if(!values.password){
                    values._id=this.user._id
                }else {values._id=null}
               const  result =await reqAddUser(values)
                if(result.status===0){
                  this.setState({isVisible:false})
                  this.getUsers()
                }else if(result.status===1){
                    message.error('你的账户或密码输入有误')
                }
                this.form.resetFields()

            }else{alert('失败')}
        });
    }
    deletUser = (user) =>{
        confirm({
            title: `你确定要删除${user.username}么？`,
            onOk: async ()=> {
                const result = await reqDeletUser(user._id)
                if(result.status===0){
                    message.success(`已经成功删除${user.username}`)
                    this.getUsers()
                }
            },
            okText:"确认",
            cancelText:"取消"
        });
    }
  componentWillMount(){
     this.initUser()
  }
  componentDidMount(){
    this.getUsers()
  }
  render() {
      const {users,isVisible,roles} =this.state
      let user=this.user ||{}
      const title=(<Button type='primary' onClick={()=>{
          this.setState({isVisible:true})
          this.user=null
      }}>创建用户</Button>)
    return (
        <Card title={title}>
          <Table
              bordered
              rowKey='_id'
              columns={this.columns}
              dataSource={users} />
          <Modal
              title={user._id?'修改用户':"新建用户"}
              visible={isVisible}
              onOk={this.addUser}
              onCancel={()=>{
                  this.setState({isVisible:false})
                  this.user=null
                  this.form.resetFields()
              }
              }
              okText="确认"
              cancelText="取消"
          >
            <Adduser roles={roles} setFrom={(form)=>this.form=form} user={user}/>

          </Modal>

        </Card>
    )
  }
}