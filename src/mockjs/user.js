import Mock from 'mockjs'
import * as mUtils from '@/utils/mUtils'


let List = []
const count = 1000
let typelist = ['联通', '移动', '电信', '铁通']

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    sortnum: i + 1,
    username: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    createTime: Mock.Random.datetime(),
    updateTime: Mock.Random.now(),
    ip:Mock.mock('@ip'),
    region:Mock.mock('@region'),
    areaId:/\d{7}/,
    email: Mock.Random.email(),
    'isp|1': typelist
  }))
}

export default {
  // 用户登录
  login: config => {
    let data = JSON.parse(config.body);
    let userList = {};
    if(data.username === 'admin'&&data.password==='123456'){
        userList = {
            token:'admin',
            name:'管理员',
        }
    }else if(data.username === 'editor'&&data.password==='123456'){
        userList = {
            token:'editor',
            name:'曹荣勋',
        }
    }else{
       return {
        code: -1,
        type:'error',
        message: "用户名或者密码有误"
       }
    }
    return {
      code: 200,
      data: {
        userList: userList
      }
    }
  },
   // 用户登出
   logout: config => {
    return {
      code: 200,
      data: {
        userList: ""
      }
    }
  },
  // 获取登录用户信息
  getUserInfo:config => {
    let data = JSON.parse(config.body);
    let userList = {};
    if(data.token === 'admin'){
        userList = {
            roles: ['admin'],
            name:'admin',
            avatar:'/static/img/avatar-2.ae5c7caf.jpg'
        }
    }else if(data.token === 'editor'){
        userList = {
            roles: ['editor'],
            name:'editor',
            avatar:'/static/img/avatar-3.5b49772a.png'
        }
    }else{
        userList = {}
    }
    return {
      code: 200,
      data: {
        userList: userList
      }
    }
  },
   /**
   * 获取用户列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getUserList:config => {
    const { limit , page } = JSON.parse(config.body);
    let mockList = List;
    const userList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 200,
      data: {
        total: mockList.length,
        userList: userList
      }
    }
  }

  
}