import store from '../store/index'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_URL_API
axios.defaults.headers.common['app-token'] = process.env.VUE_APP_APP_TOKEN
axios.defaults.headers.common['Access-Control-Allow-Origin'] ='*'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

axios.interceptors.request.use(
    (config: any) => {
        if(store.getters.isLoggedIn) config.headers.Authorization = `Bearer ` + store.getters.getToken
        return config
    },
    (err: any) => console.log(err)
)

axios.interceptors.response.use(
    (response:any) => {return response;},
    async function(err:any) {
        const originalRequest = err.config;
        const old = store.getters.getToken
        if (err.response.status == '401' && !originalRequest._retry) {
            const res = await axios.post('auth/refresh', {expiredToken:store.getters.getToken, refreshToken: store.getters.getRefreshToken})
            store.dispatch('refresh', {response:res})
            console.log(old + '|' + store.getters.getToken)
            return axios(originalRequest)
        }
        console.log(err)
        return Promise.reject(err);
    }
)
 
export default axios