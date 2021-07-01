import axios from "./API";

export default {
    async checkout(data:any) {
        return await axios.post('order', data)
    },
    async history() {
        return await axios.get('order')
    },
    async updateOrder(id:string, data:any) {
        return await axios.put('order/'+ id, {status:data})
    }
}