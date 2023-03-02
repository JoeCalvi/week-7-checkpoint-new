import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/constants.js";

export const CommentSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    body: { type: String, required: true, minLength: 3, maxLength: 500 },
    isAttending: { type: Boolean, default: false }
}, defaultSchemaOptions)

CommentSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('event', {
    ref: 'Event',
    localField: 'eventId',
    foreignField: '_id',
    justOne: true
})

