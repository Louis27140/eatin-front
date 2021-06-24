<template>
    <v-app-bar
        app
        color="white"
        dark
    >
        <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
        ></v-avatar>

        <router-link to="/">
            <v-img
                name="app-logo"
                :src="img"
                width="100"
                contain
        />
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