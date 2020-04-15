import React, { Component } from 'react';
import './index.less'
import {connect} from 'react-redux'
import menuList from '../../mockData/menu'
import {withRouter} from 'react-router-dom'
import {logout} from '../../store/actionCreator'

class Header extends Component{
  state = {
    headerTitle: ''
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key===path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有子item中查找匹配的
        const cItem = item.children.find(citem => path.indexOf(citem.key)===0)
        // 如果有值才说明有匹配的
        if(cItem) {
          // 取出它的title
          title = cItem.title
        }
      }
    })
    return title
  }


  logingout = () => {
    this.props.logout()
  }

  UNSAFE_componentWillMount () {
    this.setState({
      headerTitle: this.getTitle()
    })
  }

  render () {
    return (
      <div className="header-wrap">
        <div className="title">{this.props.title || this.state.headerTitle}</div>
        <div className="header-right">
          <span>admin</span>
          <span onClick={() => {this.logingout()}}>退出登录</span>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({
    title: state.headerTitle
  }),
  {
    logout
  }
)(withRouter(Header))