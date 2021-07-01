<template>
  <v-alert v-if="!!error" :type="type" text class="alert">
    {{error}}
  </v-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Alert extends Vue {
    @Prop() error: string|undefined
    @Prop() type: string|undefined

    updated() {
      setTimeout(() => {
        this.$store.dispatch('resetAlert')
      }, 2000)
    }
}
</script>

<style scoped>
.alert {
  position: fixed;
width: 100%;
}
</style>