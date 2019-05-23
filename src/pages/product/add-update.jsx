import React, {Component} from 'react'
import {
    Card,
    Icon,
    Form,
    Input,
    Cascader,
    Upload,
    Button}from 'antd'
import Mybutton from '../../components/button/button'
import {reqClassify} from '../../api'


 class AddUpdate extends Component {
     constructor (props) {
         super(props)
         this.pw = React.createRef()
     }
     state={
         options: [],
     }
     loadData=()=>{

     }
    async componentDidMount(){
       const result=await reqClassify(0)
       const datas=result.data
       const options=datas.map((item)=>{
           return{
               value:item.name,
               label:item.name,
               isLeaf: false,
           }
      })
        this.setState({
            options
        })

     }


    render() {
        const title=(<span>
              <Mybutton style={{fontSize:'20px',marginRight:'15px'}} onClick={()=> this.props.history.goBack()}>
                    <Icon type="arrow-left"/>
                </Mybutton>
                商品详情
        </span>)
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 8 }, // 右侧包裹的宽度
        }
        console.log(this);
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title={title} style={{ width: '100%' }}>

                <Form  {...formItemLayout}>
                        <Form.Item  label="商品名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入商品名称' }],
                            })(
                                <Input type='text'/>,
                            )}
                        </Form.Item>
                    <Form.Item label="商品描述">
                        {getFieldDecorator('desc', {
                            rules: [{ required: true, message: '请输入商品描述' }],
                        })(
                            <Input type='text'/>,
                        )}
                    </Form.Item>
                    <Form.Item  label="商品价格">
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: '请输入商品价格' }],
                        })(
                            <Input addonAfter='元' type='text'/>,
                        )}
                    </Form.Item>
                    <Form.Item label="商品分类">
                        {getFieldDecorator('categoryIds', {
                            rules: [{ required: true, message: '必须指定商品分类' }],
                        })(
                            <Cascader
                                placeholder='请指定商品分类'
                                options={this.state.options}
                                loadData={this.loadData}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>

                    </Form.Item>
                </Form>

            </Card>
        )
    }
}
export default Form.create()(AddUpdate)