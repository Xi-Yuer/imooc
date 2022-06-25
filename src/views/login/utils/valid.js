export const validateUserName = val => {
  if (!val) {
    return '用户名不能为空'
  }
  if (val.length < 3) {
    return '用户名必须至少3个字符长'
  }
  if (val.length > 15) {
    return '用户名最多必须是15个字符'
  }
  if (!/^[a-zA-Z0-9]+$/.test(val)) {
    return '用户名只能包括字母和数字'
  }
  return true
}
export const validatePassword = val => {
  if (!val) {
    return '密码不能为空'
  }
  if (val.length < 6) {
    return '密码必须至少有6个字符长'
  }
  if (val.length > 15) {
    return '密码最多必须是15个字符长'
  }
  if (!/^[a-zA-Z0-9]+$/.test(val)) {
    return '密码必须仅包含字母和数字'
  }
  return true
}

// 确认密码
export const validateConfirmPassword = (val, password) => {
  if (!val) {
    return '确认密码不能为空'
  }
  if (val !== password[0]) {
    return '两次输入的密码不一致'
  }
  return true
}
