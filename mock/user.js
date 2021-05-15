
const tokens = {
  admin: {
    token: 'admin-token',
    password: 'admin'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: '该角色为超级管理员',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    name: 'admin'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const token = tokens[username]


      if (token && token.password === password) {
        return {
          code: 20000,
          data: token
        }
      }

      return {
        code: 60204,
        message: '您的账号或密码错误，请重新登录'
      }


    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '获取用户信息失败，请重新登录'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
