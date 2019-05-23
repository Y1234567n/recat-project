import React, {Component} from 'react'
import { Card,List, Typography,Icon  } from 'antd';
import Mybutton from '../../components/button/button'
import {BASE_IMG_URL} from '../../utils/constants'
import {reqClassifys} from '../../api'

/*
 角色路由
 */
const Item = List.Item
export default class Detail extends Component {
    state={
        cName1:'',
        cName2:''
    }
   async componentDidMount(){
        const {categoryId,pCategoryId}=this.props.location.state.product
       if(pCategoryId==='0') { // 一级分类下的商品
           const result = await reqClassifys(categoryId)
       const cName1 = result.data.name
           this.setState({cName1})
        }else {
           const results = await Promise.all([reqClassifys(pCategoryId), reqClassifys(categoryId)])
           const cName1 = results[0].data.name
           const cName2 = results[1].data.name
           console.log(cName1,cName2);
           this.setState({
               cName1,
               cName2
           })
       }



    }
    render() {
        const title=(<span>
                <Mybutton style={{fontSize:'20px',marginRight:'15px'}} onClick={()=> this.props.history.goBack()}>
                    <Icon type="arrow-left"/>
                </Mybutton>
                商品详情
        </span>

        )
        console.log(this.props.location.state.product);
        const {name,desc,price,imgs,detail}=this.props.location.state.product
        const {cName1,cName2}=this.state
        console.log('######',cName1);
        return (
            <Card title={title}  style={{ width: '100%' }}>
                <List
                    bordered
                >
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>{cName1} {cName2 ? ' --> '+cName2 : ''}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span>
              {
                  imgs.map(img => (
                      <img
                          key={img}
                          src={BASE_IMG_URL + img}
                          className="product-img"
                          alt="img"
                      />
                  ))
              }
            </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}>
            </span>
                    </Item>

                </List>


            </Card>
        )
    }
}