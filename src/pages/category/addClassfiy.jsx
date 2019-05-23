import React, {Component} from 'react'
import {Form, Select, Input}from 'antd'
import PropTypes from 'prop-types'
/*
 角色路由
 */
const Item = Form.Item
const Option = Select.Option
class AddClassfiy extends Component {
    static propTypes = {
        classfiy: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired,
    }
    componentWillMount() {
        this.props.setForm(this.props.form)

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {classfiy, parentId} = this.props
        return (
            <Form>
                <Item label='所属分类'>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Select>
                                <Option key='0' value='0'>一级分类</Option>
                                {
                                   classfiy.map((item)=> <Option key={item._id} value={item._id}>{item.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>

                <Item label='分类名称'>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: ''
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddClassfiy)