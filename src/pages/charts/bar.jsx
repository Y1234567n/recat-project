import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
柱状图路由
 */



export default class Bar extends Component {
    update=()=>{

    }

    render() {
      const title=(<Button type='primary' onClick={this.update}>更新</Button>)
    return (
      <div>
        <Card title={title}></Card>
        <Card title="柱状图一"></Card>
      </div>
    )
  }
}