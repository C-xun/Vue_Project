import router from './router'
import store from './store'
import NProgress from 'nprogress' 
process.env.NODE_ENV === "development" && import('nprogress/nprogress.css')
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' 
import { getUserInfo } from "@/api/user";
import {
  setTitle
} from '@/utils/mUtils'

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true 
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
   const browserHeaderTitle = to.meta.title
   store.commit('SET_BROWSERHEADERTITLE', {
     browserHeaderTitle: browserHeaderTitle
   })
  if (getToken('Token')) {
    if(to.path === '/login') {
      next({ path: '/' })  
      NProgress.done() 
    } else {
      if (store.getters.roles.length === 0) {
        let token = getToken('Token');
        getUserInfo({"token":token}).then().then(res => {
          let userList = res.data.userList;
          store.commit("SET_ROLES",userList.roles);
          store.commit("SET_NAME",userList.name);
          store.commit("SET_AVATAR",userList.avatar);
          store.dispatch('GenerateRoutes', { "roles":userList.roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() 
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})
