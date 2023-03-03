<template>
    <div class="MyEventCard">
        <router-link :to="{ name: 'Event', params: { eventId: myEvent.event.id } }" class="text-dark">
            <div class="card my-events mb-3">
                <div class="card-body">
                    <p><b>{{ myEvent.event.name }}</b></p>
                    <img :src="myEvent.event.coverImg" class="img-fluid rounded" alt="">
                </div>
            </div>
        </router-link>
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
.my-events {
    height: 12em;
    width: 10em;
}
</style>