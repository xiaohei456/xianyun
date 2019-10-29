// 有关用户的数据仓库
// 暴露数据
export const state = () => {
    return {
        userInfo: {
            token: '',
            user: { }
        }
    }
}
// 暴露mutation
export const mutations = {
    // 修改用户信息
    editInfo(state, userInfo) {
        state.userInfo = userInfo
    }
}
// 异步请求
export const actions = {
    // 获取表单数据，完成登录验证
    // 登录成功后获取数据，并修改仓库数据
    login(store, form) {
        // 发送axios请求登录
        this.$axios.post('/accounts/login', form)
            .then(res => {
                if (res.data.token) {
                    store.commit('editInfo', res.data)
                    // 存储到本地存储
                    localStorage.setItem('xianyun_userInfo',JSON.stringify(res.data))
                }
            })
    }
}