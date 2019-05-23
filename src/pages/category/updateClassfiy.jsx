import React, {Component} from 'react'
import {Form, Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

/*
 更新分类的Form组件
 */
class UpdateForm extends Component {

    static propTypes = {
        classfiyName: PropTypes.string,
        setForm: PropTypes.func.isRequired,
    }

    componentWillMount() {
        this.props.setForm(this.props.form)

    }

    render() {

        const {getFieldDecorator} = this.props.form
        const {classfiyName} = this.props

        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', {
                            initialValue: classfiyName
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default UpdateForm = Form.create()(UpdateForm)