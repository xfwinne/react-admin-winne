import React, { Component } from 'react'
import './index.less'
import { Menu, Icon } from 'antd';
import {Link, withRouter} from 'react-router-dom'
import menuList from '../../mockData/menu'
import {connect} from 'react-redux'
import {addHeaderTitle} from '../../store/actionCreator'

const { SubMenu } = Menu;

class LeftNav extends Component {

  // state = {
  //   menuNode: ''
  // }
  clickMenu = (title) => {
    console.log(title)
    this.props.addHeaderTitle(title)
  }

  getMenuNode  = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    return menuList.map( (item, index) => {
      if(!item.children) {
        return (
          <Menu.Item key={item.key} onClick={ () => {this.clickMenu(item.title)}}>
            <Link to={item.key}>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        // 查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) !== -1)
        // 如果存在, 说明当前item的子列表需要打开
        if (cItem) {
          this.openKey = item.key
        }
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
            }
          >
            {this.getMenuNode(item.children)}
          </SubMenu>
        )
      }
    })

  }

  UNSAFE_componentWillMount  () {
    // this.setState({
    //   menuNode: this.getMenuNode(menuList)
    // })
    this.menuNode = this.getMenuNode(menuList)
  }

  render() {
    // 得到当前请求的路由路径
    let path = this.props.location.pathname
    // 得到需要打开菜单项的key
    const openKey = this.openKey
    return (
      <div className="left-nav">
        <Link to="/" className="logo">
          <Icon className="icon" type="slack-square" />
          <h1>winne后台管理</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultSelectedKeys={['/home']}
          defaultOpenKeys={[openKey]}
        >

          {
            this.menuNode
          }

        </Menu>
        {/* <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>首页</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">品类管理</Menu.Item>
            <Menu.Item key="6">商品管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">
            <Icon type="pie-chart" />
            <span>用户管理</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="pie-chart" />
            <span>角色管理</span>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="mail" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="7">折线图</Menu.Item>
          </SubMenu>
        </Menu> */}
      </div>
    )
  }
}
export default connect(
  state => ({

  }),
  {
    addHeaderTitle
  }
)(withRouter(LeftNav));
