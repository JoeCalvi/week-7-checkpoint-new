<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10">

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { eventsService } from "../services/EventsService.js";

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
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
