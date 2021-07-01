import { RouteConfig } from 'vue-router'

import Restaurant from '../views/restaurants/Restaurant.vue'

const restaurantsRoute: Array<RouteConfig> = [
    {
       path:':rest',
       name:'Restaurant',
       component: Restaurant
    }
]

export default restaurantsRoute