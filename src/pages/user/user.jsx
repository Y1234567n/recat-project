import React, {Component} from 'react'
import {Card,Button,Table,Modal,Form,Input,message}from 'antd'
import MyButton from '../../components/button/button'
import {reqGetUser}from'../../api'
import {formateDate}from '../../utils/dateUtils'
import Adduser from "./add-user";

/*
用户路由
 */
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
            console.log(user);
            return (<span>
           <MyButton onClick={()=>{
             this.user=user
              this.setState({isVisible:true})
           }}>修改</MyButton>
           <MyButton>删除</MyButton>
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
        // console.log(user);
        this.form.validateFields(async (err, values) => {
            if (!err) {

               const  result =''
                if(result.status===0){

                }else if(result.status===1){
                    message.error('你的账户或密码输入有误')
                }
            }else{alert('失败')}
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
      const user=this.user||{ }
      console.log(user);
      const title=(<Button type='primary' onClick={()=>this.setState({isVisible:true})}>创建用户</Button>)
    return (
        <Card title={title}>
          <Table
              bordered
              rowKey='_id'
              columns={this.columns}
              dataSource={users} />
          <Modal
              title="新建用户"
              visible={isVisible}
              onOk={this.addUser}
              onCancel={()=>{
                  // {user={}}
                  this.setState({isVisible:false})

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