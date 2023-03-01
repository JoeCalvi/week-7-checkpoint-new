<template>
    <div class="Offcanvas">
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvas"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">New Event</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <form @submit.prevent="createEvent()">
                    <div class="mb-3">
                        <label for="name" class="form-label">Event Name</label>
                        <input type="text" class="form-control" id="name" v-model="editable.name" placeholder="name">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Event Description</label>
                        <textarea class="form-control" id="description" v-model="editable.description" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="coverImg" class="form-label">Cover Image(must be URL)</label>
                        <input type="text" class="form-control" id="coverImg" v-model="editable.coverImg"
                            placeholder="coverImg">
                    </div>
                    <div class="mb-3">
                        <label for="location" class="form-label">Event Location</label>
                        <input type="text" class="form-control" id="location" v-model="editable.location"
                            placeholder="location">
                    </div>
                    <div class="mb-3">
                        <label for="startDate" class="form-label">Event Start Date</label>
                        <input type="date" class="form-control" id="startDate" v-model="editable.startDate"
                            placeholder="startDate">
                    </div>
                    <div class="mb-3">
                        <label for="capacity" class="form-label">Event Capacity</label>
                        <input type="number" class="form-control" id="capacity" v-model="editable.capacity"
                            placeholder="capacity">
                    </div>
                    <div class="mb-3">
                        <label for="type" class="form-label">Event Type</label>
                        <select class="form-select mb-3" v-model="editable.type" aria-label="eventType">
                            <option value="concert">Concert</option>
                            <option value="convention">Convention</option>
                            <option value="sport">Sport</option>
                            <option value="digital">Digital</option>
                        </select>
                    </div>
                    <div class="text-end">
                        <button type="submit" class="btn btn-warning" data-bs-dismiss="offcanvas">Create</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})

        return {
            editable,

            async createEvent() {
                try {
                    const eventData = editable.value
                    await eventsService.createEvent(eventData)
                    editable.value = {}
                } catch (error) {
                    Pop.error('[CREATING EVENT]', error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>