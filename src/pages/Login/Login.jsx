import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import './login.less'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../store/actionCreator'

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {      
      if (!err) {
        this.props.login(values)
      }
    });
  }
  // 自定义校验
  validatorPwd = (rule, value, callback) => {
    if(!value){
      callback('密码不能为空')
    }else if(value.length < 4){
      callback('密码不能少于4位')
    }else if(value.length > 12){
      callback('密码不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码仅由数字、字母和下划线组成')
    }else{
      callback()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let userInfo = this.props.userInfo
    if (userInfo && userInfo._id) {
      return <Redirect to="/home"/>
    }
    return (
      <div className="login-wrap">
        <header className="login-header">
          <Icon className="icon" type="slack-square" />
          <h1>React 项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                // 声明式校验：使用别人定义好的验证规则进行验证（弊端：如果多个比配上校验信息提示就会一起显示在页面上）
                rules: [
                  { required: true, message: '用户名不能为空' },
                  { min: 4, message: '用户名不能少于4位' },
                  { max: 12, message: '用户名不能大于12位' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名仅由数字、字母和下划线组成' }
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
             {/* <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              /> */}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { validator: this.validatorPwd }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
              {/* <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              /> */}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
const LoginForm = Form.create()(Login);
export default connect(
  state => ({
    userInfo: state.userInfo
  }),
  {
    login
  }
)(LoginForm);
