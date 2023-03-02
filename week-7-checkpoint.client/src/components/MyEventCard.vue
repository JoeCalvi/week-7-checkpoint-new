<template>
    <div class="MyEventCard">
        <div class="card my-events">
            <div class="card-body">
                <p><b>{{ myEvent.event.name }}</b></p>
                <img :src="myEvent.event.coverImg" class="img-fluid" alt="">
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
.my-events {
    height: 12em;
    width: 10em;
}
</style>