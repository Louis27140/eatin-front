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

                <v-card-text>
                    {{price}}
                </v-card-text>

                <v-fade-transition>
                    <v-overlay
                        v-if="hover"
                        absolute
                        color="#036358"
                    >
                <v-btn>Afficher</v-btn>
                </v-overlay>
    </v-fade-transition>
            </v-card>
        </template>
    </v-hover>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Menu extends Vue {
    @Prop() id: string|undefined
    @Prop() src: string|undefined
    @Prop() name: string|undefined
    @Prop() desc: string|undefined
    @Prop() price: any|undefined

    data () {
        return {
            overlay: false,
        }
    }

    @Emit()
    accessRestaurant() {
        this.$store.dispatch('setRestaurant', {id:this.id})
        this.$router.push('/restaurant/' + this.name)
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