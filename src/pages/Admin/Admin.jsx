import React, { Component } from 'react'
// import memoryData from '../../utils/memoryData'
import { Layout } from 'antd';
import LeftNav from '../../components/LeftNav/LeftNav'
import Header from '../../components/Header/Header'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import {Redirect, Route, Switch} from 'react-router-dom'
import Home from '../Home/Home'
import Category from '../Category/Category'
import Product from '../Product/Product'
import User from '../User/User'
import Role from '../Role/Role'
import Bar from '../Charts/Bar'
import Line from '../Charts/Line'
import Pie from '../Charts/Pie'
const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    let userInfo = this.props.userInfo
    if (!userInfo._id) {
      return <Redirect to="/login"/>
    }
    return (
      <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{backgroundColor: '#fff'}}>
            <Switch>
              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/products/category" component={Category}></Route>
              <Route exact path="/products/product" component={Product}></Route>
              <Route exact path="/user" component={User}></Route>
              <Route exact path="/role" component={Role}></Route>
              <Route exact path="/charts/bar" component={Bar}></Route>
              <Route exact path="/charts/line" component={Line}></Route>
              <Route exact path="/charts/pie" component={Pie}></Route>
              <Redirect  to="/home"/> {/* 如果匹配不到上面的任何一个路由时，就会直接跳转到/home */}
            </Switch>        
          </Content>
          <Footer style={{textAlign: 'center'}}>底部版权信息</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.userInfo
  })
)(Admin)
