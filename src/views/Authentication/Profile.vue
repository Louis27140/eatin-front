<template>
  <v-container fill-height>
    <v-row
    justify="center"
    >
        <v-col
        cols="6"
        >
        <v-form ref="profileForm" v-model="profileValid" lazy-validation>
          <v-btn :color="readOnly ? 'primary' : 'warning' " @click="setReadOnly(readOnly, userSchema)" icon ><v-icon>mdi-pencil</v-icon></v-btn>
            <v-form-base :schema="userSchema" :model="user" @input="log" @click="log"/>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'

import vFormBase from 'vuetify-form-base'

import formHelpers from '@/helpers/formHelpers'

export default Vue.extend({
name: 'Profile',
components: {vFormBase},
data() {
  return {
    readOnly: true,
    profileValid: false,
    editable: false,
    user: {},
    userSchema: {
      fullName:{
        firstName:{type:'text', label:'Prénom', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:6, readonly:true},
          lastName:{type:'text', label:'Nom', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:6, readonly:true}
      },
        phoneNumber:{type:'text', label:'Numéro de téléphone', rules: [
          formHelpers.mandatory,
          formHelpers.regexPhone,
        ], col:12,
        prependIcon:'mdi-phone'
        , readonly:true
        },
        address: {
          street:{type:'text', label:'Rue', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:12,
          prependicon:'mdi-house'
          , readonly:true
          },
          city:{type:'text', label:'Ville', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:4,
          prependIcon:'mdi-city'
          , readonly:true
          },
          state:{type:'text', label:'Region/Etat', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:4
          , readonly:true
          },
          zip:{type:'text', label:'Code postal', rules: [
            formHelpers.mandatory,
            formHelpers.regexZipCode
          ], col:4
          , readonly:true
          }
        },
        sponsorCode:{type:'text', label:'Code de parainage', tooltip:'Copié',col:12, appendIcon:'mdi-content-copy', tag:'copy', readonly:true},
      }
  }
},

created() {
  this.$store.dispatch('profile')
  this.user = this.$store.getters.getUser
},

methods: {
  log(val) {
    let { on, key, obj, params } = val
    if (on === 'click' && key === 'sponsorCode') { 
        // toggle visibility of password control
        var copyText = document.querySelector(".key-form-base-sponsorCode");
        copyText.select()
        document.execCommand('copy')
    }
  },
  setReadOnly(readonly, obj) {
  this.readOnly = !readonly
  Object.keys(obj).forEach(key => {
  if (key != "sponsorCode" && key != "address" && key != "fullName") {
      obj[key].readonly = this.readOnly;
  }
  else if (key == "address" || key == "fullName") {
      this.setReadOnly(readonly, obj[key]);
  }
});
}
}
})
</script>

<style>

</style>