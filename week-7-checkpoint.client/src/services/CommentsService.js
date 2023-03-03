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
        AppState.comments = new Comment(res.data)
        logger.log(AppState.comments)
        await this.getEventComments(commentData.eventId)
    }

    async deleteComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        let oldCommentIndex = AppState.comments.findIndex(c => c.id == commentId)
        AppState.comments.splice(oldCommentIndex, 1)
        logger.log('OLD COMMENT', oldCommentIndex, 'ALL COMMENTS', AppState.comments)
    }
}

export const commentsService = new CommentsService()