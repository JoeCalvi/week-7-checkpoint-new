import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class CommentsService {

    async getEventComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId })
            .populate('creator', 'name picture')
        return comments
    }
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        await comment.populate('event')
        return comment
    }

    async deleteComment(commentId, requestorId) {
        const comment = await dbContext.Comments.findByIdAndDelete(commentId)
        if (!comment) {
            throw new BadRequest('Comment does not exist.')
        }
        if (comment.creatorId.toString() != requestorId) {
            throw new Forbidden('Must be creator of comment to delete it.')
        }
        return 'deleted comment'
    }
}

export const commentsService = new CommentsService()