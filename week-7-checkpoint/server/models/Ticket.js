import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/constants.js";

export const TicketSchema = new Schema({
    accountId: { type: Schema.Types.ObjectId, required: true },
    eventId: { type: Schema.Types.ObjectId, required: true }
}, defaultSchemaOptions)

TicketSchema.virtual('profile', {
    ref: 'Account',
    localField: 'eventId',
    foreignField: '_id',
    justOne: true
})

TicketSchema.virtual('event', {
    ref: 'Event',
    localField: 'eventId',
    foreignField: '_id',
    justOne: true
})

