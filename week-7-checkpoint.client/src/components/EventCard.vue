<template>
    <div class="EventCard">
        <router-link :to="{ name: 'Event', params: { eventId: event.id } }" class="text-dark">
            <div class="card event-card p-3 selectable">
                <div class="row">
                    <div class="col-12 text-center">
                        <h4 class="p-2">{{ event.name }}</h4>
                        <div class="row align-items-center">
                            <div class="col-md-6">
                                <img :src="event.coverImg" :alt="event.coverImg" class="img-fluid rounded">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body border border-dark rounded">
                                    <ul>
                                        <li>{{ event.startDate }}</li>
                                        <li>Capacity: {{ event.capacity }}</li>
                                        <li>{{ event.location }}</li>
                                        <li>Event Type: {{ event.type }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-12 text-end my-2">
                                <button v-if="event.creatorId == account.id" class="btn btn-danger" title="Cancel Event"
                                    @click="cancelEvent()"><i class="mdi mdi-trash-can"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>


<script>

import { computed } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
export default {
    props: {
        event: {
            type: Event,
            required: true
        }
    },
    setup() {
        const route = useRoute()
        return {
            account: computed(() => AppState.account),

            async cancelEvent() {
                try {
                    const eventId = route.params.eventId
                    await eventsService.cancelEvent(eventId)
                } catch (error) {
                    Pop.error('[CANCELLING EVENT]', error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.event-card {
    height: 45vh;
}
</style>