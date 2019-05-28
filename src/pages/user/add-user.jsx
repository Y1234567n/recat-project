import React, {Component} from 'react'
import {Form,Input,Select }from 'antd'
import PropTypes from 'prop-types'


const Option=Select.Option
class Adduser extends Component {
    static propTypes={
        setFrom:PropTypes.func.isRequired,
        roles:PropTypes.array
    }
    componentWillMount(){
        this.props.setFrom(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {roles,user}=this.props

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }
        return (
            <Form {...formItemLayout} >
                <Form.Item label="用户名">
                    {getFieldDecorator('username', {
                        initialValue: user.username,
                        rules: [{ required: true, message: '请输入用户名' },
                            {max:12,message:'最多输入12位'},
                            {min:4,message:'最少输入4位'},
                            {pattern:/\w/,message:'必须使用字母数字或者下划线'}],
                    })(<Input />)}
                </Form.Item>
                {
                    user._id?null:(<Form.Item label="密码">
                        {getFieldDecorator('password', {
                            initialValue: '',
                            rules: [{ required: true, message: '请输入密码' },
                                {max:12,message:'最多输入12位'},
                                {min:4,message:'最少输入4位'},
                                {pattern:/\w/,message:'必须使用字母数字或者下划线'}],
                        })(<Input type='password' />)}
                    </Form.Item>)
                }


                <Form.Item label="手机号">
                    {getFieldDecorator('phone', {
                        initialValue: user.phone,
                        rules: [{ required: true, message: '请输入手机号' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="邮箱">
                    {getFieldDecorator('email', {
                        initialValue: user.email,
                        rules: [{ required: true, message: '请输入邮箱'}],
                    })(<Input />)}
                </Form.Item>

                <Form.Item label="管理层">
                    {getFieldDecorator('role_id', {
                        initialValue:user.role_id,
                    })(<Select>
                        {
                        roles.map((item)=>{
                            return(
                                <Option key={item._id}>
                                    {item.name}
                                </Option>
                            )
                        })
                        }
                    </Select>)}
                </Form.Item>

            </Form>
        )
    }
}
export default Form.create()(Adduser)