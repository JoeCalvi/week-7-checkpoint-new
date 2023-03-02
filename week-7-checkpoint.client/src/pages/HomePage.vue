<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="mb-2">
        <h1 class="text-center">My Upcoming Events:</h1>
      </div>
      <div v-for="tickets in myTickets" class="col-md-3">
        <MyEventCard :myEvent="tickets" />
      </div>
    </div>
    <div class="row justify-content-center my-3">
      <div class="col-md-10">
        <div class="row my-3">
          <div class="col-12 d-flex justify-content-evenly bg-dark rounded p-3">
            <button class="btn btn-warning" @click="changeFilterType('')">All</button>
            <button class="btn btn-warning" @click="changeFilterType('concert')">Concert</button>
            <button class="btn btn-warning" @click="changeFilterType('convention')">Convention</button>
            <button class="btn btn-warning" @click="changeFilterType('sport')">Sport</button>
            <button class="btn btn-warning" @click="changeFilterType('digital')">Digital</button>
          </div>
        </div>
        <div class="row">
          <div class="mb-2">
            <h1 class="text-center">All Events:</h1>
          </div>
          <div v-for="e in events" class="col-6 mb-3">
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
