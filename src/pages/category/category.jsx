import React, {Component} from 'react'
import {Card,Button,Icon,Table,message,Modal}from 'antd'
import Mybutton from '../../components/button/button'
import {reqClassify,reqaddClassify,reqUpdateClassify} from '../../api'
import AddClassfiy from './addClassfiy'
import UpdateForm from './updateClassfiy'
/*
商品分类路由
 */
export default class Category extends Component {
  state={
      loading:false,
      classfiy:[],
      classfilTwos:[],
      parentId:'0',
      classfiyName:'',
      showStatus:0
  }
    getClassfiy=async ()=>{
    const {parentId}=this.state
      this.setState({loading:true})
     const resul=await reqClassify(parentId)
      this.setState({loading:false})
      if(resul.status===0){
        if(parentId==='0'){
            this.setState({classfiy:resul.data})
        }else {
            this.setState({classfilTwos:resul.data})
        }

      }else {
          message.error('请求出问题了')
      }
  }
    classfiyOne=()=>{
      this.setState({
              classfilTwos:[],
              parentId:'0',
              classfiyName:''})
    }
    showClassfiyTwos=(Classf)=>{
        this.setState({
              parentId:Classf._id,
              classfiyName:Classf.name,
              showStatus:0
          },()=>{
              this.getClassfiy(this.state.parentId)
          })
      }
    addclassfiy= async ()=>{
        const {parentId,categoryName} = this.from.getFieldsValue()
        this.setState(
            {showStatus:0}
        )
        this.from.resetFields()
        const result=await reqaddClassify(categoryName,parentId)
        if (result.status === 0) {
          /*
           添加一级分类
           在当前分类列表下添加
           */
            if (parentId === '0' || parentId === this.state.parentId) {
                // 获取当前添加的分类所在的列表
                this.getClassfiy(parentId)
            }
        }
      }
    showupdateClassfiy=(classf)=>{
      this.classf=classf
      this.setState({showStatus:2})
    }
    updateClassfiy= async ()=>{
        this.setState({showStatus:0})
        const categoryId = this.classf._id
        const {categoryName} = this.from.getFieldsValue()

        const result=await reqUpdateClassify(categoryId,categoryName)

        if(result.status===0){
            this.getClassfiy()
        }else {
            message.error('请求出问题了')
        }
        this.from.resetFields()
    }
    componentWillMount(){
      this.columns = [
          {
              title: '分类名称',
              dataIndex: 'name',
          },
          {
              title: '操作',
              render: (classf) => {return <span>
                <Mybutton onClick={()=>{
                  this.showupdateClassfiy(classf)
                }} style={{width:'80px'}} >	修改分类</Mybutton>
                {
                  this.state.parentId==='0'? <Mybutton onClick={()=>this.showClassfiyTwos(classf)} style={{width:'150px'}}> 查看子分类</Mybutton>:''
                }

              </span>
              },
              width:'35%',
          }
      ];

  }
    componentDidMount(){
this.getClassfiy()
  }
  render() {
    const {parentId,classfiy,loading,classfilTwos,classfiyName,showStatus}=this.state
    const title=(
        <p>
        <Mybutton onClick={this.classfiyOne}>一级分类列表</Mybutton>
          <span>
              {parentId!=='0'?<span><Icon type="arrow-right"/>{classfiyName}</span>:''}
          </span>
        </p>
    )
     const extra =(<Button type='primary' onClick={()=>{this.setState({showStatus:1})}}><Icon type="plus"/>添加分类</Button>)
      let calssf=this.classf||{}

      return (
        <Card title={title} extra={extra} style={{ width:'100%' }}>
          <Table
              bordered
              rowKey='_id'
              loading={loading}
              pagination={{pageSize:3}}
              dataSource={parentId==='0'?classfiy:classfilTwos}
              columns={this.columns} />;
          <Modal
              title="Basic Modal"
              visible={showStatus===1}
              onOk={this.addclassfiy}
              onCancel={() => this.setState({showStatus: 0})}
          >
            <AddClassfiy
                classfiy={classfiy}
                parentId={parentId}
                setForm={from=>this.from=from}
            />

          </Modal>
          <Modal
              title="Basic Modal"
              visible={showStatus===2}
              onOk={this.updateClassfiy}
              onCancel={() => this.setState({showStatus: 0})}
          >
            <UpdateForm
                classfiyName={calssf.name}
                setForm={from=>this.from=from}
            />

          </Modal>
        </Card>
    )
  }
}