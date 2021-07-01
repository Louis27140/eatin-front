<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="6">
        <h1 class="mb-4">Mon profil</h1>
        <v-form ref="profileForm" v-model="profileValid" lazy-validation>
          <v-btn
            :color="readOnly ? 'primary' : 'warning'"
            @click="setReadOnly(readOnly, userSchema)"
            icon
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
          <v-form-base
            :schema="userSchema"
            :model="user"
            @input="log"
            @click="log"
          />
        </v-form>

        <v-btn tile color="success" v-show="!readOnly" @click="save">
          <v-icon left>
            mdi-check
          </v-icon>
          Valider
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

import vFormBase from "vuetify-form-base";

import formHelpers from "@/helpers/formHelpers";

export default Vue.extend({
  name: "Profile",
  components: { vFormBase },
  data() {
    return {
      readOnly: true,
      profileValid: false,
      editable: false,
      user: {},
      userSchema: {
        fullName: {
          firstName: {
            type: "text",
            label: "Prénom",
            rules: [formHelpers.mandatory, formHelpers.maxLength],
            col: 6,
            readonly: true,
          },
          lastName: {
            type: "text",
            label: "Nom",
            rules: [formHelpers.mandatory, formHelpers.maxLength],
            col: 6,
            readonly: true,
          },
        },
        phoneNumber: {
          type: "text",
          label: "Numéro de téléphone",
          rules: [formHelpers.mandatory, formHelpers.regexPhone],
          col: 12,
          prependIcon: "mdi-phone",
          readonly: true,
        },
        address: {
          street: {
            type: "text",
            label: "Rue",
            rules: [formHelpers.mandatory, formHelpers.maxLength],
            col: 12,
            prependicon: "mdi-house",
            readonly: true,
          },
          city: {
            type: "text",
            label: "Ville",
            rules: [formHelpers.mandatory, formHelpers.maxLength],
            col: 4,
            prependIcon: "mdi-city",
            readonly: true,
          },
          state: {
            type: "text",
            label: "Region/Etat",
            rules: [formHelpers.mandatory, formHelpers.maxLength],
            col: 4,
            readonly: true,
          },
          zip: {
            type: "text",
            label: "Code postal",
            rules: [formHelpers.mandatory, formHelpers.regexZipCode],
            col: 4,
            readonly: true,
          },
        },
        sponsorCode: {
          type: "text",
          label: "Code de parainage",
          col: 12,
          readonly: true,
        },
      },
    };
  },

  created() {
    this.$store.dispatch("profile");
    this.user = this.$store.getters.getUser;
  },

  methods: {
    log(val) {
      let { on, key, obj, params } = val;
      if (on === "click" && key === "sponsorCode") {
        // toggle visibility of password control
        var copyText = document.querySelector(".key-form-base-sponsorCode");
        copyText.select();
        document.execCommand("copy");
      }
    },
    setReadOnly(readonly, obj) {
      this.readOnly = !readonly;
      Object.keys(obj).forEach((key) => {
        if (key != "sponsorCode" && key != "address" && key != "fullName") {
          obj[key].readonly = this.readOnly;
        } else if (key == "address" || key == "fullName") {
          this.setReadOnly(readonly, obj[key]);
        }
      });
    },

    save() {
      if (this.$refs.profileForm.validate()) {
        this.$store.dispatch("updateProfile", {
          profile: {
            firstName: this.user.fullName.firstName,
            lastName: this.user.fullName.lastName,
            street: this.user.address.street,
            city: this.user.address.city,
            state: this.user.address.state,
            zip: this.user.address.zip,
            phoneNumber: this.user.phoneNumber,
          },
        });

        this.readOnly = true;
      }
    },
  },
});
</script>

<style></style>
