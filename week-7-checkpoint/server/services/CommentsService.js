import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


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

    async deleteComment(commentId) {
        const comment = await dbContext.Comments.findByIdAndDelete(commentId)
        if (!comment) {
            throw new BadRequest('Comment does not exist.')
        }
        return 'deleted comment'
    }
}

export const commentsService = new CommentsService()