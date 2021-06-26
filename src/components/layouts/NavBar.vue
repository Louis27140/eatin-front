<template>
    <v-app-bar
        app
        color="white"
    >

        <router-link to="/" class="text-decoration-none">
            <v-app-bar-title class="text-uppercase grey--text text-h4">
                <span class="font-weight-light black--text">Eat</span>
                <span class="success--text" >in</span>
            </v-app-bar-title>
        </router-link>

        <v-btn 
        class="black--text"
        color="white"
        rounded
        to="/login"
        absolute
        right
        v-if="false"
        >
        se connecter
        </v-btn>

        <v-menu
        min-width="200"
        offset-y
        v-if="true"
        >
            <template v-slot:activator="{ on }">
                
                <v-btn
                    icon
                    x-large
                    v-on="on"
                    absolute
                    right
                >
                    <v-avatar
                    color="brown"
                    size="40"
                    >
                    <span class="white--text text-h5">LC</span>
                </v-avatar>
            </v-btn>
        </template>
            <v-card>
                <v-list-item-content class="justify-center">
                    <div class="mx-auto text-center">
                    <v-btn
                        depressed
                        rounded
                        text
                        to="/profile"
                    >
                        Mon Compte
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                        depressed
                        rounded
                        text
                        to="/orders"
                    >
                        Mes commandes
                    </v-btn>
                    <v-divider class="my-3"></v-divider>
                    <v-btn
                        depressed
                        rounded
                        text
                    >
                        Déconnexion
                    </v-btn>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-menu>

    </v-app-bar>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class NavBar extends Vue {
    data() {
        return {
            img: require('@/assets/app-logo.png')
        }
    }

}
</script>

<style>

</style>