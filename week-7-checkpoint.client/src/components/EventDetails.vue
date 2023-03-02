<template>
    <div class="EventDetails">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <img :src="event.coverImg" :alt="event.coverImg" class="img-fluid rounded">
                    <h1 class="p-2 text-center">{{ event.name }}</h1>
                    <div class="row align-items-center justify-content-center">
                        <div class="col-md-8 mb-3">
                            <div class="border border-dark rounded p-3 d-flex justify-content-center">
                                <ul>
                                    <li>{{ event.startDate }}</li>
                                    <li>Capacity: {{ event.capacity }}</li>
                                    <li>{{ event.location }}</li>
                                    <li>Event Type: {{ event.type }}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-12">
                            <h3>Event Description:</h3>
                            <p>{{ event.description }}</p>
                        </div>
                        <div class="col-md-12 d-flex justify-content-end my-2">
                            <button v-if="event.creatorId != account.id" class="btn btn-primary">Get Ticket</button>
                            <button v-if="event.creatorId == account.id" class="btn btn-danger" title="Cancel Event"
                                @click="cancelEvent()"><i class="mdi mdi-trash-can"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
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
        const router = useRouter()
        const route = useRoute()
        return {
            account: computed(() => AppState.account),

            async cancelEvent() {
                try {
                    if (await Pop.confirm('Are you sure you want to cancel this event?')) {
                        const eventId = route.params.eventId
                        await eventsService.cancelEvent(eventId)
                        router.push("/")
                    }
                } catch (error) {
                    Pop.error('[CANCELLING EVENT]', error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>