<template>
<v-container>
    

</v-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
name:'Restaurant',
created() {
    this.$store.dispatch('setMenues')
    this.$store.dispatch('setArticles')
}
})
</script>

<style>

</style>