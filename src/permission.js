import router from './router'
import NProgress from 'nprogress' // 页面跳转，顶部进度条
import 'nprogress/nprogress.css'
import { getToken, getUserInfo, setUserInfo } from '@/utils/auth'
import { getInfo } from '@/api/user'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
    NProgress.start()

    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            let hasUserInfo = getUserInfo()
            if (hasUserInfo) {
                next()
            } else {
                getInfo(hasToken).then((response) => {
                    setUserInfo(response.data)
                    next({ ...to, replace: true })
                }).catch(() => {
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                })
            }

        }
    } else if (!hasToken && to.path !== '/login' && to.path !== '/error') { //无token页面跳转至login
        console.log(to);

        next(`/login?redirect=${to.path}`)
        NProgress.done()
    } else {
        next()
    }
})

router.afterEach(() => {
    NProgress.done()
})
