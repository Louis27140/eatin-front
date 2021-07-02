import store from '@/store'
import axios from './API'

export default {
    async getAvailableDeliveries() {
        return await axios.get('delivery')
    },
    async getMyDeliveries() {
        return await axios.get('delivery?userId=' + store.getters.getID)
    },
    async updateDelivery(id, delivererId, status) {
        return await axios.put('delivery/' + id, {delivererId:delivererId, status:status} )
    }
}