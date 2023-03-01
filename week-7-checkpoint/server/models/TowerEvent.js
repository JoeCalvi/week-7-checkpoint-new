import { Schema } from "mongoose";
import { defaultSchemaOptions } from "../db/constants.js";


export const TowerEventSchema = new Schema(
    {
        name: { type: String, required: true, minLength: 3, maxLength: 500 },
        description: { type: String, required: true, minLength: 3, maxLength: 1000 },
        coverImg: { type: String, required: true, minLength: 3, maxLength: 5000 },
        location: { type: String, required: true, minLength: 3, maxLength: 500 },
        capacity: { type: Number, required: true, min: 1, max: 20000 },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, required: true, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true },
        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
    }, defaultSchemaOptions)

TowerEventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})