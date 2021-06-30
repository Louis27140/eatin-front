<template>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Alert extends Vue {
    @Prop() data: any|undefined

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