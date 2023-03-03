<template>
  <div class="container-fluid bg-dark text-light">
    <div class="row my-3">
      <div v-if="account.id" class="col-md-12 mb-2">
        <h1 class="text-center">My Upcoming Events:</h1>
      </div>
      <div v-for="tickets in myTickets" class="col-md-2 d-flex justify-content-center border-end border-warning">
        <MyEventCard :myEvent="tickets" />
      </div>
    </div>
    <div class="row justify-content-center my-3">
      <div class="col-md-10">
        <div class="row my-3">
          <div class="col-12 p-3">
            <div class="row justify-content-evenly align-items-center">
              <div class="col-md-2 d-flex justify-content-center">
                <h5>Sort By:</h5>
              </div>
              <div class="col-md-2 d-flex justify-content-center mb-2">
                <button class="btn btn-warning" @click="changeFilterType('')">All</button>
              </div>
              <div class="col-md-2 d-flex justify-content-center mb-2">
                <button class="btn btn-warning" @click="changeFilterType('concert')">Concert</button>
              </div>
              <div class="col-md-2 d-flex justify-content-center mb-2">
                <button class="btn btn-warning" @click="changeFilterType('convention')">Convention</button>
              </div>
              <div class="col-md-2 d-flex justify-content-center mb-2">
                <button class="btn btn-warning" @click="changeFilterType('sport')">Sport</button>
              </div>
              <div class="col-md-2 d-flex justify-content-center mb-2">
                <button class="btn btn-warning" @click="changeFilterType('digital')">Digital</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-2">
            <h1 class="text-center">All Events:</h1>
          </div>
          <div v-for="e in events" class="col-md-6 mb-3">
            <EventCard :event="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from "../services/EventsService.js";
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import { ticketsService } from '../services/TicketsService.js';

export default {
  setup() {

    const filterEvents = ref('')

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error("[GETTING ALL EVENTS]", error);
      }
    }

    async function getMyTickets() {
      try {
        if (AppState.account.id) {
          await ticketsService.getMyTickets();
        }
      } catch (error) {
        Pop.error('[GETTING MY TICKETS]', error);
      }
    }

    onMounted(() => {
      getAllEvents();
    });

    watchEffect(() => {
      if (AppState.account.id) {
        getMyTickets();
      }
    })

    return {
      events: computed(() => {
        if (!filterEvents.value) {
          return AppState.events;
        } else {
          return AppState.events.filter(e => e.type == filterEvents.value);
        }
      }),
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),

      changeFilterType(type) {
        filterEvents.value = type;
      }
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss"></style>
