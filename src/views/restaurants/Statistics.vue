<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <h1 class="mb-4">Vos statistiques</h1>
        <apexchart
          width="500"
          type="line"
          :options="options"
          :series="series"
        ></apexchart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Statistics",
  components: {},
  data() {
    return {
      options: {
        title: {
          text: "Commandes par semaine",
        },
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "orders",
          data: [],
        },
      ],
    };
  },

  created() {
    this.$store.dispatch("setSelfRestaurant");
    this.$store.dispatch("setStatistics");

    const statistics = this.$store.getters.getStatistics;
    this.options.xaxis.categories = statistics.map((stat) => stat._id);
    this.series[0].data = statistics.map((stat) => stat.count);

    console.log(this.options.xaxis.categories);
  },

  computed: {},

  methods: {},
});
</script>

<style></style>
