<template>
    <div class="MyEventCard">
        <div class="row mt-2">
            <div class=".col-md-12">
                <div class="row mb-5 pb-3">
                    <div class="col-md-3 d-flex align-items-center">
                        <router-link :to="{ name: 'Event', params: { eventId: myEvent.event.id } }"
                            class="text-light selectable">
                            <img :src="myEvent.event.coverImg" class="event-img rounded mb-3" alt="">
                        </router-link>
                    </div>
                    <div class="col-md-3 d-flex justify-content-md-center">
                        <div class="text-light pe-2">
                            <h3 >{{ myEvent.event.name }}</h3>
                            <ul>
                                <li>{{ myEvent.event.startDate }}</li>
                                <li>{{ myEvent.event.location }}</li>
                                <li>{{ myEvent.event.type }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex align-items-center">
                        <div class=" ps-4">
                            <h5>Event Description:</h5>
                            <p>
                                {{ myEvent.event.description }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { MyTicket } from "../models/Ticket.js";

export default {
    props: {
        myEvent: {
            type: MyTicket,
            required: true
        }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.event-img {
    height: 15em;
    width: 15em;
    object-fit: cover;
    object-position: center;
}
</style>