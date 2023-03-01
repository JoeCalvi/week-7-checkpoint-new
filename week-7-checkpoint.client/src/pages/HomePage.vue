<template>
  <div class="container-fluid">
    <div class="row justify-content-center my-3">
      <div class="col-md-10">
        <div class="row">
          <div v-for="e in events" class="col-6 mb-3">
            <div class="card event-card p-3">
              <div class="row">
                <div class="col-12 text-center">
                  <h4 class="p-2">{{ e.name }}</h4>
                </div>
                <div class="row align-items-center">
                  <div class="col-6">
                    <img :src="e.coverImg" :alt="e.coverImg" class="img-fluid rounded">
                  </div>
                  <div class="col-6">
                    <div class="card-body border border-dark rounded">
                      <ul>
                        <li>{{ e.startDate }}</li>
                        <li>Capacity: {{ e.capacity }}</li>
                        <li>{{ e.location }}</li>
                        <li>Event Type: {{ e.type }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default {
  setup() {
    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error('[GETTING ALL EVENTS]', error);
      }
    }

    onMounted(() => {
      getAllEvents()
    })
    return {
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">

.event-card{
  height: 60vh;
}
</style>
