import store from 'store'

let USER_INFO = 'userInfo'

export let setUserInfo = (value) => {
  store.set(USER_INFO, value)
}

export let getUserInfo = () => {
  return store.get(USER_INFO) || {}
}

export let removeUserInfo = () => {
  store.remove(USER_INFO)
}