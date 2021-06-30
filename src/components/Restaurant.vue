<template>
    <v-hover>
        <template  v-slot:default="{ hover}">
            <v-card tile elevation="24">
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
                <v-btn @click="accessRestaurant()">Afficher</v-btn>
                </v-overlay>
    </v-fade-transition>
            </v-card>
        </template>
    </v-hover>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Restaurant extends Vue {
    @Prop() id: number|undefined
    @Prop() src: string|undefined
    @Prop() name: string|undefined
    @Prop() desc: string|undefined

    data () {
        return {
            overlay: false,
        }
    }

    @Emit()
    accessRestaurant() {
        this.$store.dispatch('setRestaurant', {id:this.id})
        this.$router.push('/restaurant/' + this.id)
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