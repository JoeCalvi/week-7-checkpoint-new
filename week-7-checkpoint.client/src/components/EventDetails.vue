<template>
    <div class="EventDetails">
        <div class="col-md-12">
            <div class="row mt-3">
                <div class="col-md-12">
                    <img :src="event.coverImg" :alt="event.coverImg" class="cover-img rounded">
                </div>
                <div class="col-md-12 d-flex justify-content-center mt-3">
                    <h1 class="p-2">Event: {{ event.name }}</h1>
                </div>
                <div class="col-md-12 d-flex justify-content-end mb-2">
                    <div class="d-flex gap-3 align-items-center">
                        <button v-if="!event.isCanceled && event.capacity > 0" :disabled="event.creatorId == account.id"
                            class="btn btn-primary" @click="getTicket()">Get
                            Ticket</button>
                        <button :disabled="event.isCanceled || event.creatorId == account.id" class="btn btn-danger"
                            title="Remove My Ticket" @click="deleteTicket()">Remove My
                            Ticket</button>
                        <button :disabled="event.isCanceled" v-if="event.creatorId == account.id" class="btn btn-danger"
                            title="Cancel Event" @click="cancelEvent()">Cancel Event</button>
                    </div>
                </div>
            </div>
            <div class="row align-items-center justify-content-center mt-3">
                <div class="col-md-8 mb-3">
                    <div class="border border-warning rounded p-3 d-flex justify-content-center">
                        <ul>
                            <li v-if="event.capacity == 0" class="sold-out">Sold Out!</li>
                            <li>When: {{ event.startDate }}</li>
                            <li>Capacity: {{ event.capacity }}</li>
                            <li>Where: {{ event.location }}</li>
                            <li>Event Type: {{ event.type }}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-12 d-flex gap-1 my-3 p-3">
                    <div v-for="t in tickets">
                        <EventTicket :ticket="t" />
                    </div>
                </div>
                <div class="col-md-10 p-3 border-top border-warning">
                    <div class="row justify-content-center pt-3 mt-3">
                        <div class="col-md-10">
                            <h3>Event Description:</h3>
                            <div class="pt-2">
                                <p>{{ event.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="row mt-5 justify-content-center">
                <div class="col-md-11 mb-4">
                    <div class="row align-items-center justify-content-between">
                        <div class="col-md-2">
                            <h4>Comments:</h4>
                        </div>
                        <div class="col-md-8 border-top border-warning d-none d-lg-block">

                        </div>
                        <div class="col-md-2 d-flex justify-content-md-end">
                            <button :disabled="event.isCanceled" class="btn btn-warning" data-bs-toggle="modal"
                            data-bs-target="#comment-modal">Add
                            Comment</button>
                        </div>
                    </div>
                </div>
                <div v-for="c in comments" class="col-md-12">
                    <div class="row mb-5 align-items-center justify-content-between">
                        <div class="col-md-2 d-flex justify-content-center">
                            <img :src="c.creator?.picture" :alt="c.creator?.picture" class="rounded-circle">
                        </div>
                        <div class="col-md-8 pb-3 mt-2 border-bottom border-warning">
                            <div>
                                <p>{{ c.creator?.name }} at {{ c.updatedAt }}</p>
                                <p>{{ c.body }}</p>
                            </div>
                        </div>
                        <div class="col-md-1 pe-5 d-none d-lg-block">
                            <button v-if="c.creatorId == account.id" class="btn btn-danger" title="Delete Comment"
                                @click="deleteComment(`${c.id}`)">
                                <i class="mdi mdi-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <NewCommentModal />
</template>


<script>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";
import EventTicket from "./EventTicket.vue";
export default {
    props: {
        event: {
            type: Event,
            required: true
        },
        comment: {
            type: Comment,
            required: true
        }
    },
    setup() {
        const router = useRouter();
        const route = useRoute();
        async function getAllTicketsToThisEvent() {
            try {
                const eventId = route.params.eventId;
                await ticketsService.getAllTicketsToThisEvent(eventId);
            }
            catch (error) {
                Pop.error("[GETTING TICKETS TO THIS EVENT]", error);
            }
        }


        async function getEventComments() {
            try {
                const eventId = route.params.eventId;
                await commentsService.getEventComments(eventId);
            } catch (error) {
                Pop.error('[GETTING EVENT COMMENTS]', error);
            }
        }

        onMounted(() => {
            getAllTicketsToThisEvent();
            getEventComments();
        });

        return {

            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            myTickets: computed(() => AppState.myTickets),
            comments: computed(() => AppState.comments),
            event: computed(() => AppState.event),

            async getTicket() {
                try {
                    const eventId = route.params.eventId;
                    await ticketsService.getTicket(eventId);
                }
                catch (error) {
                    Pop.error("[GETTING TICKET]", error);
                }
            },
            async cancelEvent() {
                try {
                    if (await Pop.confirm("Are you sure you want to cancel this event?")) {
                        const eventId = route.params.eventId;
                        await eventsService.cancelEvent(eventId);
                        router.push("/");
                    }
                }
                catch (error) {
                    Pop.error("[CANCELLING EVENT]", error);
                }
            },

            async deleteTicket() {
                try {
                    const eventId = route.params.eventId
                    const myTicket = this.myTickets.find(t => t.accountId == this.account.id && t.eventId == eventId)
                    if (!myTicket) {
                        Pop.toast('You do not have a ticket to delete.', 'error', 'center', 3000, true)
                        return
                    }
                    const ticketId = myTicket.id
                    await ticketsService.deleteTicket(ticketId, eventId)
                } catch (error) {
                    Pop.error('[DELETING TICKET]', error)
                }
            },

            async deleteComment(commentId) {
                try {
                    await commentsService.deleteComment(commentId)
                } catch (error) {
                    Pop.error('[DELETING COMMENT]', error)
                }
            }
        };
    },
    components: { EventTicket }
}
</script>


<style lang="scss" scoped>
.sold-out {
    font-weight: bold;
    font-style: italic;
    color: #FF5977;
}

.cover-img {
    object-fit: cover;
    object-position: center;
    width: 100%;
}
</style>