<template>
    <v-hover>
        <template  v-slot:default="{ hover}">
            <v-card tile elevation="12">
                <v-img
                height="100"
                :src="img"
                >
                </v-img>
                <v-card-title>{{ name }}</v-card-title>

                <v-card-subtitle>
                    {{desc}}
                </v-card-subtitle>

                <v-fade-transition>
                    <v-overlay
                        v-if="hover"
                        absolute
                        color="#036358"
                    >
                <v-btn @click="addArticleToCart(id)">Ajouter au panier</v-btn>
                </v-overlay>
    </v-fade-transition>
            </v-card>
        </template>
    </v-hover>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Article extends Vue {
    @Prop() id: string|undefined
    @Prop() src: string|undefined
    @Prop() name: string|undefined
    @Prop() desc: string|undefined

    data () {
        return {
            overlay: false,
        }
    }

    @Emit()
    addArticleToCart(id: any) {
        let item = this.$store.getters.getArticles.find((e:any) => e._id == id)
        if (this.$store.getters.getCart.find(e => e.restaurantId == item.restaurantId) || this.$store.getters.getCart[0] === undefined) {
            console.log(!!this.$store.getters.getCart.find(e => e.restaurantId == item.restaurantId) || this.$store.getters.getCart[0] === undefined)
            this.$store.dispatch('addToCart', {item:item})
        }
    }

    get img() {
        try {
            return require('@/assets/restaurants/' + this.src + '.jpg')
        } catch (error) {
            return 'https://cdn.vuetifyjs.com/images/cards/cooking.png'
        }
    }
}
</script>

<style scoped>

</style>