<template>
  <v-footer
    color="black"
    padless
    >
      <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="button in buttons"
        :key="button.name"
        color="white"
        text
        rounded
        class="my-2"
        :to="button.link"
      >
        {{ button.name }}
      </v-btn>
      <v-col
        class="lighten-2 py-4 text-center white--text"
        cols="12"
      >
        © {{ new Date().getFullYear() }} Eatin
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {
    @Prop() buttons: []|undefined
}
</script>

<style>

</style>