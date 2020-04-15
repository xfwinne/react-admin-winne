import {combineReducers} from 'redux'
import {ADD_USER, ADD_TITLE, CLEAR_USER} from './actionTypes'
import {getUserInfo} from '../utils/localData'

// 菜单项的初始数据
let headerTitleDefaultState = ''
let headerTitle = (state = headerTitleDefaultState, action) => {
  switch (action.type){
    case ADD_TITLE:
      return action.data
    default:
      return state
  }
}

// 登录用户数据的初始值
let userInfoDefaultState = getUserInfo()
let userInfo = (state = userInfoDefaultState, action) => {
  switch (action.type){
    case ADD_USER:
      return action.data
    case CLEAR_USER:
      return {}
    default:
      return state
  }
}

export default combineReducers ({
  headerTitle,
  userInfo
})