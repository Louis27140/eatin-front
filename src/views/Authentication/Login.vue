<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="6">
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          <h1>Une petite faim ?</h1>
          <v-form-base
            :schema="schema"
            :model="model"
            @input="log"
            @click="log"
          />
          <v-btn
            :loading="loader"
            :disabled="!valid || loader"
            color="success"
            class="mr-4 mb-3"
            @click="validate"
            width="100%"
            rounded
          >
            Connexion
          </v-btn>
          <p>
            Pas de compte Eatin ?
            <router-link class="success--text" to="/signup">
              Créer un compte
            </router-link>
          </p>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import vFormBase from "vuetify-form-base";

import formHelper from "@/helpers/formHelpers";

export default Vue.extend({
  components: { vFormBase },
  data() {
    return {
      valid: true,
      loader: false,
      model: {
        email: "",
        password: "",
      },
      schema: {
        email: {
          type: "text",
          label: "Adresse mail",
          rules: [formHelper.mandatory, formHelper.regexMail],
          col: 12,
          prependIcon: "mdi-email",
        },
        password: {
          type: "password",
          label: "Password",
          rules: [formHelper.mandatory, formHelper.regexPassword],
          col: 12,
          prependIcon: "mdi-lock",
          appendIcon: "mdi-eye",
        },
      },
    };
  },
  name: "Login",
  methods: {
    validate() {
      if (this.$refs.loginForm.validate())
        this.$store
          .dispatch("login", { credentials: this.model })
          .then(() => (this.loader = true))
          .catch((err) => {
            this.$store.dispatch("setAlert", {
              type:'error',
              alert: err.response.data.details.message,
            });
          })
          .finally(() => {
            this.$store.dispatch("profile");

            this.loader = false;

            this.$router.push("/restaurant");
          });
    },
    log(val) {
      let { on, key, obj, params } = val;

      if (
        on === "click" &&
        key === "password" &&
        (params && params.tag) === "append"
      ) {
        // toggle visibility of password control
        obj.schema.type === "password"
          ? (obj.schema.appendIcon = "mdi-eye-off")
          : (obj.schema.appendIcon = "mdi-eye");
        obj.schema.type = obj.schema.type === "password" ? "text" : "password";
      }
    },
  },
  computed: {},
});
</script>

<style></style>
