<template>
  <v-alert v-if="!!error" type="error" text class="alert">
    {{error}}
  </v-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Alert extends Vue {
    @Prop() error: any|undefined

    updated() {
      setTimeout(() => {
        this.$store.dispatch('reset')
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