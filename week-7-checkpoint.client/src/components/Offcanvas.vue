<template>
    <div class="Offcanvas">
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">New Event</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <form>
                    <div class="mb-3">
                        <label for="name" class="form-label">Event Name</label>
                        <input type="text" class="form-control" id="name" placeholder="name">
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Event Description</label>
                        <textarea class="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="coverImg" class="form-label">Cover Image(must be URL)</label>
                        <input type="text" class="form-control" id="coverImg" placeholder="coverImg">
                    </div>
                    <div class="mb-3">
                        <label for="location" class="form-label">Event Location</label>
                        <input type="text" class="form-control" id="location" placeholder="location">
                    </div>
                    <div class="mb-3">
                        <label for="startDate" class="form-label">Event Start Date</label>
                        <input type="text" class="form-control" id="startDate" placeholder="startDate">
                    </div>
                    <div class="mb-3">
                        <label for="capacity" class="form-label">Event Capacity</label>
                        <input type="number" class="form-control" id="capacity" placeholder="capacity">
                    </div>
                    <select class="form-select" aria-label="eventType">
                        <option selected>Event Type</option>
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                    </select>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';

export default {
    setup() {
        const editable = ref({})

        return {
            editable,
        }
    }
}
</script>


<style lang="scss" scoped></style>