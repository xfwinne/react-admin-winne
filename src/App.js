import React, {Component} from 'react';
// import { Button, message } from 'antd';
import Login from './pages/Login/Login.jsx';
import Admin from './pages/Admin/Admin.jsx';
import {
  // HashRouter,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          {/* 两种写入组件的方式都可以，但是组件内获取到router组件属性有差异 */}
          {/* <Route exact path="/"> <Login /> </Route> */}
          <Route exact path="/login" component={Login}></Route>
          <Route path="/" component={Admin} />
          {/* <Route exact path="/" component={Admin} />
              里面还有二级路由的时候，不能在这里加exact，不然后面的二级路由匹配不到显示不了
          
          */}
        </Switch>
      </Router>
    )
  }
}
