<template>
    <div class="EventTicket">

        <div>
            <img :src="ticket.profile.picture" class="event-goer rounded-circle">
        </div>

    </div>
</template>


<script>
import { EventTicket } from "../models/Ticket.js";

export default {
    props: {
        ticket: {
            type: EventTicket,
            required: true
        }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.event-goer{
    height: 3em;
}
</style>