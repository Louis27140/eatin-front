import axios from "./API";

import store from '@/store/index'

export default {
    async getRestaurants() {
        return await axios.get('restaurant')
    },
    async getMenues() {
        return await axios.get('restaurant/' + store.getters.getID + '/menu')
    },
    async getarticles() {
        return await axios.get('restaurant/' + store.getters.getID + '/article')
    },
    async getCategories() {
        return await axios.get('restaurant/' + store.getters.getID + '/category')
    }
}