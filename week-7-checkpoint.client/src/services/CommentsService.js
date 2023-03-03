import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

    async getEventComments(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        AppState.comments = res.data.map(c => new Comment(c))
        logger.log('[EVENT COMMENTS]', AppState.comments)
    }

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log(res.data)
    }

    async deleteComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        logger.log(res.data)
    }
}

export const commentsService = new CommentsService()