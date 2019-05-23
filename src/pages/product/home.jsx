import React, {Component} from 'react'
import { Card ,Select,Input,Icon,Button,Table } from 'antd';
import {reqCommodity,reqSearchProducts,reqUpdates} from '../../api'
import MyButton from '../../components/button/button'
import './product.less'
/*
 角色路由
 */
const Option = Select.Option
export default class ProductHome extends Component {
    state = {
        total: 0, // 商品的总数量
        products: [], // 当前页列表数据
        searchType: 'productName', // 搜索类型  productName / productDesc
        searchName: '', // 搜索关键字
        pageSize:3
    }
      // getCommodity=async (pageNum)=>{
      //       const pageSize =this.state.pageSize
      //       const reluet=await reqCommodity(pageNum,pageSize)
      //       const dayas=reluet.data
      //       if(reluet.status===0){
      //           this.setState({
      //               products:dayas.list,
      //               total:reluet.total
      //           })
      //       }
      //   }//getCommodity
    getCommodity  = async (pageNum)=>{
        const {searchType, searchName,pageSize}=this.state
        let reluet
        if (searchName) {
            reluet =await reqSearchProducts({pageNum, pageSize, searchType, searchName})
        } else { // 一般分页请求
            reluet = await reqCommodity(pageNum, pageSize)
        }
        const dayas=reluet.data
        console.log(reluet);
        if(reluet.status===0){
            this.setState({
                products:dayas.list,
                total:dayas.total
            })
        }
    }
    updateStatus= async (product)=>{
        const productId=product._id
        let status = product.status===1?2:1
       const reluet =await reqUpdates(productId,status)
        if(reluet.status===0){
            this.getCommodity(1)
        }
    }
    initCommodity = ()=>{
        this.commodity=[
            {
                title:'商品名称',
                dataIndex:'name'
            },
            {
                title:'商品描述',
                dataIndex:'desc'
            },
            {
                title:'价格',
                dataIndex:'price'
            },
            {
                width:100,
                textAlign:'center',
                title:'状态',
                render: (product) => {
                    const status=product.status
                    return (
                        <span>
                            <Button type='primary' onClick={()=>this.updateStatus(product)}>{status===1?'下架':'上架'}</Button>
                            <span>{status===1?'在售':'已下架'}</span>
            </span>
                    )
                }
            },
            {
                title:'操作',
                render:(product)=>{
                    return (
                        <span>
                            <MyButton onClick={()=>this.props.history.push('/product/detail',{product})} >详情</MyButton>
                            <MyButton >修改</MyButton>
                        </span>
                    )
                }
            }
        ]

}
    componentWillMount(){
        this.initCommodity()
        this.getCommodity(1)
    }
    componentDidMount(){
        // this.getCommodity(1)
    }

    render() {
        const {products,searchName,total}=this.state
        console.log(total)
        const title=(  <span>
                        <Select
                            defaultValue="productName"
                            onChange={value => this.setState({searchType:value})}
                            style={{width:'120px'}}
                        >
                            <Option value="productName">
                                按名称搜索
                            </Option>
                             <Option value='productDesc'>
                                按描述搜索
                            </Option>
                        </Select>

                        <Input
                            placeholder="请输入关键字"
                            value={searchName}
                            onChange={event => this.setState({searchName:event.target.value})}
                            style={{width:'120px',margin:'0 15px'}}
                           />
                        <Button type='primary' onClick={()=>this.getCommodity (1)}>搜索</Button>
                    </span>)
        return (
                <Card
                    title={title}
                    extra={
                        <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
                            <Icon type="plus"/>
                            添加商品
                        </Button>
                    }
                    style={{ width: '100%' }}>
                    <Table
                        dataSource={products}
                        columns={this.commodity}
                        bordered
                        rowKey="_id"
                        pagination={
                            {
                                total,
                                pageSize:3,
                                showQuickJumper: true,
                                onChange:this.getCommodity
                            }
                        }
                    />
                </Card>
        )
    }
}