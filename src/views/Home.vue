<template>
  <v-container width="75vw" absolute right>
    
    <v-spacer/>
    <h1>Restaurant</h1>
    <v-spacer></v-spacer>
    <v-row>
      <v-col xs="12" md="4" :key="item.id" v-for="item in restaurants">
        <restaurant
          v-bind="item"
          :id="item._id"
          :src="item.profilePicture"
          :name="item.name"
          :desc="item.description"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  //import AuthService from '@/services/AuthService'
import Vue from 'vue'
  import Restaurant from '../components/Restaurant.vue'

export default Vue.extend({
  name: "Home",

  created() {
    console.log(this.$store.getters.getInfos.role);
    this.$store.dispatch("setRestaurants");
  },
  components: {
    Restaurant,
  },
  computed: {
    restaurants() {
      return this.$store.getters.getRestaurants;
    },
  },
    mounted() {
      /*const token = await this.$messaging.getToken({ vapidKey: 'BNiHc6Sox1vukTgBDzEZpCR0e6GlNVFyN5w-lfcF9WnLZ0nEwQfyKZqhfPpRbt6lGsJlC-kd9nHlW59ZFutPkV0' }).catch((err:any) => console.log(err))
      const data = {
      deviceId: token
       }
      const res = await AuthService.firebase(data)
      console.log(res)
      console.log('Firebase cloud messaging object', this.$messaging)

      this.$messaging.onMessage(function(payload:any) {
      console.log('Receiving foreground message');
      console.log(payload)
        var notificationTitle = payload.title;
      var notificationOptions = {
        body: payload.body,
        icon: '',
      };
    
      var notification = new Notification(notificationTitle, notificationOptions);
      notification.onclick = function(event) {
        notification.close();
        console.log(event);
      };
    });*/
},
})
</script>
