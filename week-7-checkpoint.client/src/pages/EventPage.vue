<template>
    <div class="EventPage" v-if="event">
        <div class="container-fluid">
            <div v-if="!event.isCanceled" class="row">
                <EventDetails :event="event" />
            </div>
            <div v-else class="row cancelled">
                <EventDetails :event="event" />
            </div>
        </div>
    </div>
</template>


<script>
import { watchEffect, computed } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute()

        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await eventsService.getEventById(eventId);
            } catch (error) {
                Pop.error('[GETTING EVENT BY ID]', error);
            }
        }

        watchEffect(() => {
            if (route.params.eventId) {
                getEventById();
            }
        })
        return {
            event: computed(() => AppState.event)
        }
    }
}
</script>


<style lang="scss" scoped>
.cancelled {
    text-decoration: line-through;
    text-decoration-color: #FF5977;
}
</style>