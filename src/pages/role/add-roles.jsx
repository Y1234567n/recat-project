import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form,Input}from 'antd'
/*
 用户路由
 */
 class AddRoles extends Component {
     static propTypes={
         setFrom:PropTypes.func.isRequired
     }
     componentWillMount(){
         this.props.setFrom(this.props.form)
     }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout={
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        return (
            <Form>
                <Form.Item label="管理层名称" {...formItemLayout}>
                    {getFieldDecorator('roleName', {
                        rules: [{ required: true, message: '请输入一个名字' }],
                    })(<Input placeholder="请输入管理层名称" />)}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddRoles)