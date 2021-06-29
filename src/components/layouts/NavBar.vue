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
        <v-spacer/>
        <v-btn 
        class="black--text"
        color="white"
        rounded
        to="/login"
        absolute
        right
        v-if="!isLoggedIn"
        >
        se connecter
        </v-btn>
        <v-menu
        min-width="200"
        offset-y
        v-if="isLoggedIn"
        >
            <template v-slot:activator="{ on }">
                <v-btn
                    icon
                    x-large
                    v-on="on"
                >
                    <v-avatar
                    color="brown"
                    size="40"
                    >
                    <span class="white--text text-h5">{{ initials }}</span>
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
                        @click="logout"
                    >
                        Déconnexion
                    </v-btn>
                    </div>
                </v-list-item-content>
            </v-card>
        </v-menu>

    </v-app-bar>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
@Component
export default class NavBar extends Vue {
    @Prop() isLoggedIn: boolean|undefined
    @Prop() initials: string|undefined

    data() {
        return {
            //
        }
    }

    @Emit()
    logout() {
        this.$store.dispatch('logout')
        this.$router.push('/login')
    }

}
</script>

<style>

</style>