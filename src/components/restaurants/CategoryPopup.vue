<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Catégorie</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Nom"
              required
              v-model="category.name"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">
        Annuler
      </v-btn>
      <v-btn color="blue darken-1" text @click="save">
        Sauvegarder
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MenuPopup",
  data() {
    return {
      dialog: false,
      category: {
        name: "",
      },
    };
  },
  methods: {
    async save() {
      await this.$store.dispatch("createCategory", { category: this.category });

      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
