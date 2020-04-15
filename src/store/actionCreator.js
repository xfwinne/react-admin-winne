import {reqLogin} from '../api'
import {ADD_USER, ADD_TITLE, CLEAR_USER} from './actionTypes'
import {setUserInfo, removeUserInfo} from '../utils/localData'

const addUser = (data) => {
  return {
    type: ADD_USER,
    data
  }
}

export let addHeaderTitle = (data) => {
  return {
    type: ADD_TITLE,
    data
  }
}

const outLog = () => {
  return {
    type: CLEAR_USER,
  }
}

export let logout = () => {
  return (dispatch) => {
    removeUserInfo()
    dispatch(outLog())
  }
}

export let login = (values) => {
  return async(dispatch) => {
    let resultData = await reqLogin(values)
    if (resultData) {
      setUserInfo(resultData.data) // 保存到本地（刷新后仍存在）
      dispatch(addUser(resultData.data))
    }
  }
}