<template>
    <div class="EventCard">

        <router-link :to="{ name: 'Event', params: { eventId: event.id } }" class="text-dark" title="See Event">
            <div v-if="!event.isCanceled" class="card event-card p-3 selectable">
                <div class="row">
                    <div class="col-md-12 text-dark">
                        <div class="text-center">
                            <h4 class="p-2">{{ event.name }}</h4>
                        </div>
                        <div class="row align-items-center">
                            <div class="col-md-6 mb-3">
                                <img :src="event.coverImg" :alt="event.coverImg" class="img-fluid rounded">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body d-none d-lg-block">
                                    <ul>
                                        <li>{{ event.startDate }}</li>
                                        <li>Capacity: {{ event.capacity }}</li>
                                        <li>{{ event.location }}</li>
                                        <li>Event Type: {{ event.type }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>

        <div v-if="event.isCanceled" class="card event-card p-3 cancelled">
            <div class="row">
                <div class="col-md-12 text-dark">
                    <div class="text-center">
                        <h4 class="p-2">{{ event.name }}</h4>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-6 mb-3">
                            <img :src="event.coverImg" :alt="event.coverImg" class="img-fluid rounded">
                        </div>
                        <div class="col-md-6 ">
                            <div class="card-body d-none d-lg-block">
                                <ul>
                                    <li>{{ event.startDate }}</li>
                                    <li>Capacity: {{ event.capacity }}</li>
                                    <li>{{ event.location }}</li>
                                    <li>Event Type: {{ event.type }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";

export default {
    props: {
        event: {
            type: Event,
            required: true
        }
    },
    setup() {
        return {
            account: computed(() => AppState.account),
        }
    }
}
</script>


<style lang="scss" scoped>
.event-card {
    height: 20em;
}

.cancelled {
    text-decoration: line-through;
    text-decoration-color: #FF5977;
    opacity: .8;
}
</style>