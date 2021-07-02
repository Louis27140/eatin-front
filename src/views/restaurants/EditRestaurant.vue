<template>
  <v-container fill-height>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="mb-4">Mon restaurant</h1>
        <v-form ref="restaurantForm" v-model="restaurantValid" lazy-validation>
          <v-btn
            :color="readOnly ? 'primary' : 'warning'"
            @click="setReadOnly(readOnly, restaurantSchema)"
            icon
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
          <v-form-base
            :schema="restaurantSchema"
            :model="restaurant"
            @input="log"
            @click="log"
          />
        </v-form>

        <v-btn tile color="success" v-show="!readOnly" @click="save">
          <v-icon left>
            mdi-check
          </v-icon>
          Valider
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1 class="mb-4">Catégories</h1>
        <v-row align="center">
          <v-chip
            v-for="category in categories"
            :key="category._id"
            class="ma-2"
            >{{ category.name }}</v-chip
          >
          <v-dialog v-model="categoryDialog" width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon class="ma-2" color="success" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <category-popup @close="closeCategory" />
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6">
        <h1 class="mb-4">Articles</h1>
        <v-row align="center">
          <edit-restaurant-item
            type="article"
            v-for="article in articles"
            :key="article._id"
            :item="article"
          />
          <v-dialog v-model="articleDialog" width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-2" color="success" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <article-popup
              @close="closeArticle"
              :article="{}"
              action="create"
            />
          </v-dialog>
        </v-row>
      </v-col>
      <v-col cols="6">
        <h1 class="mb-4">Menus</h1>
        <v-row align="center">
          <edit-restaurant-item
            type="menu"
            v-for="menu in menues"
            :key="menu._id"
            :item="menu"
          />
          <v-dialog v-model="menuDialog" width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-2" color="success" v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <menu-popup @close="closeMenu" :menu="{}" action="create" />
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";

import vFormBase from "vuetify-form-base";
import EditRestaurantItem from "@/components/restaurants/EditRestaurantItem.vue";
import ArticlePopup from "@/components/restaurants/ArticlePopup.vue";
import MenuPopup from "@/components/restaurants/MenuPopup.vue";
import CategoryPopup from "@/components/restaurants/CategoryPopup.vue";

import formHelpers from "@/helpers/formHelpers";

export default Vue.extend({
  name: "EditRestaurant",
  components: {
    vFormBase,
    EditRestaurantItem,
    ArticlePopup,
    MenuPopup,
    CategoryPopup,
  },
  data() {
    return {
      readOnly: true,
      restaurantValid: false,
      editable: false,
      restaurant: {},
      articleDialog: false,
      menuDialog: false,
      categoryDialog: false,
      restaurantSchema: {
        name: {
          type: "text",
          label: "Nom",
          rules: [formHelpers.mandatory, formHelpers.maxLength],
          col: 12,
          readonly: true,
        },
        description: {
          type: "text",
          label: "Description",
          rules: [formHelpers.mandatory],
          col: 12,
          readonly: true,
        },
        profilePicture: {
          type: "text",
          label: "Lien de l'image",
          col: 12,
          readonly: true,
        },
      },
    };
  },
  created() {
    this.$store.dispatch("setSelfRestaurant");

    this.restaurant = this.$store.getters.getRestaurant;

    this.$store.dispatch("setCategories");
    this.$store.dispatch("setArticles");
    this.$store.dispatch("setMenues");
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    articles() {
      return this.$store.getters.getArticles;
    },
    menues() {
      return this.$store.getters.getMenues;
    },
  },

  methods: {
    log(val) {
      let { on, key, obj, params } = val;
      if (on === "click" && key === "sponsorCode") {
        // toggle visibility of password control
        var copyText = document.querySelector(".key-form-base-sponsorCode");
        copyText.select();
        document.execCommand("copy");
      }
    },
    setReadOnly(readonly, obj) {
      this.readOnly = !readonly;
      Object.keys(obj).forEach((key) => {
        if (key != "sponsorCode" && key != "address" && key != "fullName") {
          obj[key].readonly = this.readOnly;
        } else if (key == "address" || key == "fullName") {
          this.setReadOnly(readonly, obj[key]);
        }
      });
    },

    save() {
      if (this.$refs.restaurantForm.validate()) {
        this.$store.dispatch("updateRestaurant", {
          restaurant: this.restaurant,
        });

        this.readOnly = true;
      }
    },

    closeArticle() {
      this.articleDialog = false;
    },
    closeMenu() {
      this.menuDialog = false;
    },
    closeCategory() {
      this.categoryDialog = false;
    },
  },
});
</script>

<style></style>
