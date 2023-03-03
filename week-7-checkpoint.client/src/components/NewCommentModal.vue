<template>
    <div class="NewCommentModal">
        <div class="modal" id="comment-modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">New Comment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="createComment()">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="comment" class="form-label">New Comment</label>
                                <textarea class="form-control" id="comment" v-model="editable.body" rows="3"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Comment } from "../models/Comment.js";
import { commentsService } from "../services/CommentsService";
import Pop from "../utils/Pop";
export default {
    props: {
        comment: {
            type: Comment,
            required: true
        }
    },
    setup() {
        const route = useRoute()
        const editable = ref({})
        return {
            editable,

            async createComment() {
                try {
                    let commentData = editable.value
                    commentData.eventId = route.params.eventId
                    await commentsService.createComment(commentData)
                    editable.value = {}
                } catch (error) {
                    Pop.error('[CREATING COMMENT]', error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>