<template>
  <v-container fill-height fluid>
    <v-row
    justify="center"
    >
        <v-col
        cols="6"
        >
        <h1>C'est parti !</h1>
      <v-stepper alt-labels v-model="step" flat>
        <v-stepper-header>
          <v-stepper-step
          :complete="step > 1"
          step="1"
          >
          Création des identifiants
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
          :complete="step > 2"
          step="2"
          >
          Informations de l'utilisateur
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form ref="authForm" v-model="authValid" lazy-validation>
              <v-form-base
                :model="infos"
                :schema="authSchema"
                @input="log"
                @click="log"
              />
              <v-btn
              :disabled="!authValid"
              color="primary"
              @click="validateAuth(2)"
              rounded
              >
              Suivant
            </v-btn>
            </v-form>
            
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-form ref="profileForm" v-model="profileValid" lazy-validation>
              <v-form-base 
              :model="infos"
              :schema="profileSchema"/>
            </v-form>
            <v-btn
            class="white--text"
            color="grey"
            @click="step = 1"
            rounded
            >
            Précédent
            </v-btn>
            <v-btn
            :loading="loader"
            :disabled="!profileValid || loader"
            color="success"
            @click="validateProfile()"
            right
            absolute
            rounded
            >
            Terminer
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import formHelpers from '@/helpers/formHelpers'
import Vue from 'vue'
import vFormBase from 'vuetify-form-base'

  export default Vue.extend({
    components: {vFormBase},
    data() {
      return {
        step: 1,
        authValid: true,
        profileValid: true,
        loader: false,
        authSchema: {
          role: {
            Label: 'Type de profile',
            type: 'select',
            itemText:'name',
            itemValue:'value',
            items: [
              {name:'Client', value:'USR'},
              {name:'Livreur', value:'DEL'},
              {name:'Restaurateur', value:'RES'}
            ],
            prependIcon:'mdi-account',
            col:12
          },  
          email: { type: 'email', label: 'Email', rules: [
            formHelpers.mandatory,
            formHelpers.regexMail
        ], col:12,
        prependIcon:'mdi-email'
        },
        password: { type: 'password', label: 'Mot  de passe', rules: [
            formHelpers.mandatory,
            formHelpers.regexPassword
        ], col:12,
        prependIcon: 'mdi-lock',
        appendIcon: 'mdi-eye'
        },
        passwordConfirmation: { type: 'password', label: 'Confirmation mot de passe', rules: [
            formHelpers.mandatory,
            (v) => this.infos.password == this.infos.passwordConfirmation || 'Les mots de passe sont différents',
        ], col:12,
        prependIcon: 'mdi-lock',
        appendIcon: 'mdi-eye'
        }
        },
        profileSchema: {
          firstName:{type:'text', label:'Prénom', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:6},
          lastName:{type:'text', label:'Nom', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:6},
          phoneNumber:{type:'text', label:'Numéro de téléphone', rules: [
            formHelpers.mandatory,
            formHelpers.regexPhone,
          ], col:12,
          prependIcon:'mdi-phone'
          },
          street:{type:'text', label:'Rue', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:12,
          prependicon:'mdi-house'
          },
          city:{type:'text', label:'Ville', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:4,
          prependIcon:'mdi-city'
          },
          state:{type:'text', label:'Region/Etat', rules: [
            formHelpers.mandatory,
            formHelpers.maxLength,
          ], col:4,
          },
          zip:{type:'text', label:'Code postal', rules: [
            formHelpers.mandatory,
            formHelpers.regexZipCode
          ], col:4,
          },
          sponsor:{type:'text', label:'Code de parainage',col:12 },
        },

        infos: {
          role:'USR'
        }
      }
    },
    name: 'Signup',
    methods: {
      validateAuth(step) {
        if(this.$refs.authForm.validate()) {
          if (step) this.step = step
        }
      },
      validateProfile() {
        if (this.$refs.profileForm.validate()) {
          this.signup()
        }
      },
      signup() {
        delete this.infos['passwordConfirmation']
        console.log(this.infos)
        this.$store.dispatch('signup', {infos:this.infos})
        .then(() => this.loader = true).catch(err =>{ this.$store.dispatch('setAlert', {alert:err.response.data.details.message})})
        .finally(() => {
            this.loader = false
            switch(this.$store.getters.getInfos.role) {
                case 'DEL': this.$router.push('/dev'); break;
                case 'USR': this.$router.push('/'); break;
                case 'RES': this.$router.push('/restaurant'); break;
                default: break;
            }
        })
      },
      log(val) {
            let { on, key, obj, params } = val

            if (on === 'click' && (key === 'password' || key == 'passwordConfirmation') && (params && params.tag) === 'append') { 
                // toggle visibility of password control
                obj.schema.type === 'password' ? obj.schema.appendIcon = 'mdi-eye-off' : obj.schema.appendIcon = 'mdi-eye'
                obj.schema.type = obj.schema.type === 'password' ? 'text' : 'password'
            }
            this.validateAuth()
        }
    }
  })
</script>

<style>

</style>