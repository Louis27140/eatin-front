<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Article</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Nom"
              required
              v-model="article.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Description"
              required
              v-model="article.description"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Prix"
              prefix="€"
              required
              v-model="article.price"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Lien de la photo"
              required
              v-model="article.profilePicture"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              :items="categories"
              item-text="name"
              item-value="_id"
              label="Categorie"
              v-model="article.category"
            ></v-autocomplete>
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
  name: "ArticlePopup",
  props: ["article", "action"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async save() {
      if (this.action == "update") {
        console.log(this.article);
        await this.$store.dispatch("updateArticle", { article: this.article });
      } else {
        await this.$store.dispatch("createArticle", { article: this.article });
      }

      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
  },
};
</script>

<style></style>
