<template>
  <div class="container-fluid bg-dark text-light">
    <div class="row justify-content-md-center">
      <div class="col-md-2 p-4">
        <div>
          <img class="rounded profile-img img-fluid" :src="account.picture" alt="" />
          <div class="mt-2">
            <h5>{{ account.name }}</h5>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <div class="row">
          <div class="col-md-12" v-for="tickets in myTickets">
            <AccountEvents :myEvent="tickets" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from '../AppState.js'
import MyEventCard from '../components/MyEventCard.vue';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';
export default {
  setup() {
    async function getMyTickets() {
      try {
        if (AppState.account.id) {
          await ticketsService.getMyTickets();
        }
      } catch (error) {
        Pop.error('[GETTING MY TICKETS]', error);
      }
    }

    watchEffect(() => {
      if (AppState.account.id) {
        getMyTickets();
      }
    })

    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    };
  },
  components: { MyEventCard }
}
</script>

<style scoped>
.profile-img {
  height: 10em;
  width: 10em;
}
</style>
