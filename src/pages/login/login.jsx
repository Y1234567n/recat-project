import React,{Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import logo from './images/logo.png'



class  Login extends Component{
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                alert('欢迎你'+values.username)
            }else{alert('失败')}
        });
    };
    validator=(rule,value,callback)=>{
        if(!value) {
            callback('密码必须输入')
        } else if (value.length<4) {
            callback('密码长度不能小于4位')
        } else if (value.length>12) {
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文、数字或下划线组成')
        } else {
            callback() // 验证通过
        }

    }


    render(){
        const { getFieldDecorator } = this.props.form;
        return <div className="login">
            <header className="login-header">
                <img src={logo} alt="图片加载失败"/>
                <h1>
                    欢迎来到我的管理系统
                </h1>
            </header>
            <section className="login-content">
                <h2>欢迎登陆</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名必须输入' },
                                {max:12,message:'最多输入12位'},
                                {min:4,message:'最少输入4位'},
                                {pattern:/\w/,message:'必须使用字母数字或者下划线'}]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="账号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ validator:this.validator }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>

            </section>




        </div>
    }
}
//
const WrappedNormalLogin = Form.create( )(Login);
export default WrappedNormalLogin