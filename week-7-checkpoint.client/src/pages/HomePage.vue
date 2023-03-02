<template>
  <div class="container-fluid">
    <div class="row justify-content-center my-3">
      <div class="col-md-10">
        <div class="row">
          <div v-for="e in events" class="col-6 mb-3">
            <EventCard :event="e" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from "../services/EventsService.js";
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import EventCard from '../components/EventCard.vue';

export default {
  setup() {
    const route = useRoute();
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      }
      catch (error) {
        Pop.error("[GETTING ALL EVENTS]", error);
      }
    }
    onMounted(() => {
      getAllEvents();
    });
    return {
      events: computed(() => AppState.events),
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss"></style>
