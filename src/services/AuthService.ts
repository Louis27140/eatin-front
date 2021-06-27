import axios from "./API";

export default {
    async login(credentials: any) {
        return await axios.post('auth/login', credentials);
    },
    async register(data: any) {
        return await axios.post('auth/register', data)
    },
    async profile() {
        return await axios.get('profile')
    }
}